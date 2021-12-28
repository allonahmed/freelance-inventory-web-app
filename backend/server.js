require("dotenv").config(); // loads enviroment variables from .env file
const express = require("express"); //import Express (backend framework for node web apps)
const mysql = require("mysql"); // our dbms
const cookieParser = require("cookie-parser"); // parse cookies to retrieve data from our cookie sessions
const bodyParser = require("body-parser"); // to parse data using 'req.body' to retreive data from front-end
const session = require("express-session"); //store express info in a session to save info
const filestore = require("session-file-store")(session); //filestore foor our cookie info
const bcrypt = require("bcrypt"); //to hash our passwords
const saltRounds = 10; //salt round for bcrypt
const multer = require("multer"); //file upload
const app = express(); // create our express app
const cors = require("cors");
const path = require("path");
// const { query } = require("express");
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser.json());
const PORT = process.env.PORT || 5000; //sets port to the port in the .env file or 5000 if not found
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const helper = require("./helpers");
const e = require("express");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    console.log(file);

    cb(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: storage,
});

app.use(
  session({
    // setup our cookie session
    name: "options",
    key: "ihq",
    secret: "allon", // Secret key,
    saveUninitialized: true,
    resave: true,
    store: new filestore(),
    cookie: {
      maxAge: 60 * 60 * 1000, // 1hr expiration
    },
  })
);

var db = mysql.createConnection({
  // setup our mysql db connection
  host: "localhost",
  user: "root",
  password: "password",
  database: "IHQ",
  port: "3306",
});

app.post("/signup", (req, res) => {
  //when users sign up for IHQ, they're data gets stored here
  const info = {
    first: req.body.firstName,
    last: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
  };
  bcrypt.hash(info.password, saltRounds, (error, hash) => {
    // hash function for encrypting users password
    if (error) console.log(error);
    const query =
      "INSERT INTO ihq.ihq_userinfo(first_name, last_name, email, password, user_id, role) VALUES (?,?,?,?,?,?)"; //sql query to insert data into our table
    db.query(
      //function takes in the sql query, then any variables to plug in, then function after query completes
      query,
      [info.first, info.last, info.email, hash, 4843, "Technician"],
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  });
});

app.post("/signin", (req, res) => {
  // function when user signs in
  const email = req.body.email;
  const password = req.body.password;
  const query = "SELECT * FROM ihq.ihq_userinfo WHERE email = ?"; // query checks to see if email is in the system
  db.query(query, email, (err, result) => {
    if (result.length > 0) {
      // if results length is greater than 0, that means we found that email in the table
      bcrypt.compare(password, result[0].password, (err1, resp) => {
        //compares the password with the decrypted password
        if (resp) {
          // if true
          req.session.user = result; //creating cookie session annd passing all the data from result into object user
          console.log("session info:", req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Wrong Username/password Combination" }); // if passwords don't match
        }
      });
    } else {
      res.send({ message: "User does not exist!" }); // if results length is 0 (empty results), their email is not in the system
      console.log(result);
    }
  });
});

//upload images to userinfo
app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send({ message: "You can only uploud images!!!" });
  } else {
    const image = req.file.filename;
    const email = req.body.email;

    console.log("image:", image);
    console.log("email:", email);

    const query =
      "Update IHQ.ihq_userinfo set profile_picture = ? where email = ? ";
    db.query(query, [image, email], (err, result) => {
      if (err) {
        res.send({ message: "FAILURE TO UPLOAD IMAGE TO DB" });
      } else {
        console.log("updated!");

        console.log(result);
        res.send(req.file.filename);
      }
    });
  }
});

app.use("/uploads", express.static("uploads"));

app.post("/get-profile-info", (req, res) => {
  const email = req.body.email;
  const query = "SELECT * from IHQ.ihq_userinfo where email = ?";

  db.query(query, [email], (err, result) => {
    if (err) {
      res.send({ message: "failed to get profile information" });
    } else {
      console.log("results are in!!");

      res.send(result);
    }
  });
});

//update inventory_items table
app.post("/update-inventory", (req, res) => {
  const id = req.body.id;
  const sendTo = req.body.sendTo;

  const query = helper.genererateQuery(id, sendTo);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

const generateID = () => {
  return Math.floor(Math.random() * 999999);
};
// update history log table
app.post("/update-history", (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const previousLocation = req.body.previousLocation;
  const sendTo = req.body.sendTo;
  const name = req.body.name;
  const time = req.body.time;
  const historyId = generateID();

  console.log(historyId);
  let results = true;
  const query =
    "INSERT INTO IHQ.history_changes(history_id, item_id, item_type, previous_location, current_location, who_switched, time) VALUES (?,?,?,?,?,?,?)";
  for (let i = 0; i < type.length; i += 1) {
    const historyId = generateID();
    db.query(
      query,
      [historyId, id[i], type[i], previousLocation, sendTo, name, time],
      (err, result) => {
        if (err) {
          results = false;
        } else {
          console.log(result);
          results = true;
        }
      }
    );
  }
  if (!results) {
    res.send({ message: "error updating history" });
  } else {
    console.log(results);
  }
});

//sends data from inventory_items table to client
app.get("/get-items", (req, res) => {
  db.query("select * from IHQ.inventory_items", (error, result) => {
    if (result) {
      res.send(result);
      // console.log(result);
    } else {
      res.send({
        message: "erorr!!!! 40404040404",
      });
      console.log("error 40404040404");
    }
  });
});

//get history log table
app.post("/get-my-changes", (req, res) => {
  const username = req.body.username;
  console.log(username);

  db.query(
    "select * from IHQ.history_changes where who_switched = (?) order by time ",
    [username],
    (error, result) => {
      if (result) {
        res.send(result);
        // console.log(result);
      } else {
        res.send({
          message: "erorr!!!! 40404040404",
        });
        console.log("error 40404040404");
      }
    }
  );
});

//get all history
app.get("/get-all-changes", (req, res) => {
  db.query(
    "select * from IHQ.history_changes order by time ",
    (error, result) => {
      if (result) {
        res.send(result);
        // console.log(result);
      } else {
        res.send({
          message: "erorr!!!! 40404040404",
        });
        console.log("error 40404040404");
      }
    }
  );
});

//get vehicle information
app.post("/get-vehicle-info", (req, res) => {
  const vehicle = req.body.vehicle;

  const query =
    "Select * from IHQ.inventory_items where current_location = (?)";
  db.query(query, [vehicle], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: "error getting vehicle information" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//get 5 row vehicle information
app.post("/get-vehicle-info-profile", (req, res) => {
  const vehicle = req.body.vehicle;

  const query =
    "Select * from IHQ.inventory_items where current_location = (?) ORDER BY RAND() LIMIT 10";
  db.query(query, [vehicle], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: "error getting vehicle information" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//get 5 row history log table
app.post("/get-my-changes-profile", (req, res) => {
  const username = req.body.username;
  console.log(username);

  db.query(
    "select * from IHQ.history_changes where who_switched = (?) order by time desc limit 10",
    [username],
    (error, result) => {
      if (result) {
        res.send(result);
        // console.log(result);
      } else {
        res.send({
          message: "erorr!!!! 40404040404",
        });
        console.log("error 40404040404");
      }
    }
  );
});

//get 5 row inveotry items
app.get("/get-items-profile", (req, res) => {
  db.query(
    "select * from IHQ.inventory_items ORDER BY RAND() LIMIT 10",
    (error, result) => {
      if (result) {
        res.send(result);
        // console.log(result);
      } else {
        res.send({
          message: "erorr!!!! 40404040404",
        });
        console.log("error 40404040404");
      }
    }
  );
});

app.get("/get-users", (req, res) => {
  db.query(
    "SELECT id, first_name, last_name, email, role, profile_picture, vehicle FROM IHQ.ihq_userinfo;",
    (error, result) => {
      if (result) {
        res.send(result);
        console.log(result);
      } else {
        res.send({
          message: "erorr!!!! 40404040404",
        });
        console.log("error 40404040404");
      }
    }
  );
});

app.get("/login", (req, res) => {
  // function to grab session token information if user is logged in
  if (req.session.user) {
    // if our user session exists
    console.log("login information: ", req.session.user);
    res.send({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    console.log("get login: ", req.session.user);
    res.send({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  //test listen to be sure the server is running on port
  console.log("Listening on Port", PORT);
});
