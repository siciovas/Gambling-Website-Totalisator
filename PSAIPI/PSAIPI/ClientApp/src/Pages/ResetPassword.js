import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";



function ResetPassword() {
    const [details, setDetails] = useState({email: "" });

    const submitHandler = async (e) => {
        e.preventDefault();

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          `https://localhost:7217/api/PasswordReset?email=${details.email}`,
          requestOptions
        );
        if (response.ok) {
            console.log('send')
        }
        else if (response.status === 400) {
          toastError();
        }
      };
      const toastError = () => {
        toast.error("Impossible to send.");
      };
    

    return(
        <><form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Pamiršau slaptažodį</h2>
                {/* Error */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        value={details.email} />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Priminti slaptažodį" />
                </div>
            </div>
        </form><ToastContainer /></>
    );
}


export default ResetPassword;