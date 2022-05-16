import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function LoginPage(Login) {
  const [details, setDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    yearOfBirth: null,
    identityCode: "",
    city: "",
    street: "",
    PostCode: "",
    PhoneNumber: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    };
    const response = await fetch(
      `https://localhost:7217/api/register/`,
      requestOptions
    );
    if (response.ok) {
      const addedId = await response.json();
      console.log(addedId);
      window.location.replace("/");
    } else if (response.status === 409) {
      toastError();
    }
  };

  const toastError = () => {
    toast.error("User is already exists.");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Registration</h2>
          {/* Error */}

          <div className="form-group">
            <label htmlFor="text">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              onChange={(e) =>
                setDetails({ ...details, surname: e.target.value })
              }
              value={details.surname}
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="number">Born</label>
            <input
              type="number"
              name="born"
              id="born"
              onChange={(e) =>
                setDetails({ ...details, yearOfBirth: e.target.value })
              }
              value={details.yearOfBirth}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Identity code</label>
            <input
              type="text"
              name="identity"
              id="identity"
              onChange={(e) =>
                setDetails({ ...details, identityCode: e.target.value })
              }
              value={details.identityCode}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setDetails({ ...details, city: e.target.value })}
              value={details.city}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Street</label>
            <input
              type="text"
              name="postalcode"
              id="postalcode"
              onChange={(e) =>
                setDetails({ ...details, street: e.target.value })
              }
              value={details.street}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Postal code</label>
            <input
              type="text"
              name="postalcode"
              id="postalcode"
              onChange={(e) =>
                setDetails({ ...details, PostCode: e.target.value })
              }
              value={details.PostCode}
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Phone number</label>
            <input
              type="text"
              name="number"
              id="number"
              onChange={(e) =>
                setDetails({ ...details, PhoneNumber: e.target.value })
              }
              value={details.PhoneNumber}
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
