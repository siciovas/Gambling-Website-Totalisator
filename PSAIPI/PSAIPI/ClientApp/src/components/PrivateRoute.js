import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLoggedIn = JSON.parse(localStorage.getItem("isLogged"));
  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login-page",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
