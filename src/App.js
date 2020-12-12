import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertMsg from "./components/AlertMsg";
import PrivateRoute from "./routers/PrivateRoute";
import AdminLayout from "./routers/AdminLayout";
import PublicLayout from "./routers/PublicLayout";

function App() {
  return (
    <Router>
      <AlertMsg />
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
