import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import AddInventory from "./pages/inventory/AddInventory";
import ViewInventory from "./pages/inventory/ViewInventory";
import RemoveInventory from "./pages/inventory/RemoveInventory";
import Inventory from "./pages/inventory/Inventory";

import Changes from "./pages/analytics/Changes";
import Profile from "./pages/Userprofile.js";
import Login from "./components/Login";
import Particles from "react-tsparticles";
import Signup from "./components/Signup";
import { Navigation } from "./components/navigation";
import json from "./assets/particles.json";
import VehicleItems from "./pages/analytics/vehicleInventory";
import AllHistory from "./pages/advanced/AllHistory";
import TeamChat from "./pages/advanced/TeamChat";
import TeamRoster from "./pages/advanced/TeamRoster";

function App() {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="app">
      {/* <Particles
        className="particles"
        id="tsparticles"
        options={JSON.parse(json)}
      /> */}
      <Router>
        <Navigation
          myStyle={user.loggedIn === false ? { display: "none" } : {}}
        />
        <Switch>
          <Route path={"/inventory/add"}>
            <AddInventory name="addInventory" />
          </Route>
          <Route path={"/inventory/remove"}>
            <RemoveInventory name="removeInventory" />
          </Route>
          <Route path={"/inventory/view"}>
            <ViewInventory name="viewInventory" />
          </Route>
          <Route path={"/inventory"} name="inventory">
            <Inventory name="inventory" />
          </Route>
          <Route path={"/my/changes"} component={Changes} />
          <Route
            path={"/my/vehicle"}
            name="/my/changes"
            component={VehicleItems}
          />
          <Route path="/advanced/chat" component={TeamChat} />
          <Route path="/advanced/roster" component={TeamRoster} />
          <Route path="/advanced/history" component={AllHistory} />
          <Route path="/advanced/create-user" component={Signup} />
          <Route path="/user" component={Profile} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
