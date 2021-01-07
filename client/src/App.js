import React from "react";
import {
  NavBar,
  Home,
  Login,
  Register,
  Todos,
  Admin,
  Footer,
  UserPage,
} from "./Components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./HOCS/PrivateRoute";
import UnPrivateRoute from "./HOCS/UnPrivateRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Route exact path="/" component={Home} />
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute
          path="/articles"
          roles={["user", "admin"]}
          component={Todos}
        />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
        <PrivateRoute
          path="/userpage"
          roles={["admin", "user"]}
          component={UserPage}
        />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
