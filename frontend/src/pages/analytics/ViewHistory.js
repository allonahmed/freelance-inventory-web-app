import React from "react";
import { useSelector } from "react-redux";

const ViewHistory = () => {
  // const [loginStatus, setLoginStatus] = useState(false);
  // const [name, setName] = useState("");

  const isLogged = useSelector((state) => state.isLogged);
  console.log(isLogged);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/login").then((response) => {
  //     console.log("response", response.data.loggedIn);
  //     if (response.data.loggedIn == true) {
  //       setLoginStatus(response.data.loggedIn);
  //       setName(response.data.user[0].first_name);
  //     }
  //   });
  // }, []);
  return <div>VIEW YOUR HISTORY HERE {isLogged}</div>;
};

export default ViewHistory;
