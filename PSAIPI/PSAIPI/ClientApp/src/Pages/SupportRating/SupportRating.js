import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';


const SupportRating = () => {
    const [rate, setRate] = useState({ date: null, rating: "" });

    const submitRating = async (e) => {
        e.preventDefault();
        setRate(rate => ({...rate, date: new Date()}))
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rate)
          };
          const response = await fetch(`https://localhost:7217/api/rate/`, requestOptions);
          if (response.ok) {
            toastSuccess();
          } else {
            toastError();
          }
    }

    const toastSuccess = () =>{
        toast.success("Rate is successfully added");
    }

    const toastError = () => {
        toast.error("Something went wrong");
      }

    return (
        <div>
          <h1>Klientų aptarnavimo specialisto įvertinimo forma</h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={submitRating}>
              <div class="form-group">
                <label for="exampleFormControlInput1">Įvertinimo žinutė</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" value={rate.rating} onChange={e => setRate(rate => ({ ...rate, rating: e.target.value }))} />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success mt-2">Įvertinti</button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
    )
}

export default SupportRating;