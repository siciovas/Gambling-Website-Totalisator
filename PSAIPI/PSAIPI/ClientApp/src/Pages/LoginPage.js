import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function LoginPage(Login) {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    };
    const response = await fetch(
      `https://localhost:7217/api/login/`,
      requestOptions
    );
    if (response.ok) {
      const userPayload = await response.json();
      console.log(userPayload);
      localStorage.setItem("userId", JSON.stringify(userPayload.id));
      localStorage.setItem("isLogged", JSON.stringify(true));
      localStorage.setItem("roleId", JSON.stringify(userPayload.roleId));
      window.location.replace("/");
    } else if (response.status === 401) {
      toastError();
    }
  };
  const toastError = () => {
    toast.error("Impossible to login.");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Prisijungti</h2>
          {/* Error */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Prisijungti"
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
