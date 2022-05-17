import react, { useState, useEffect } from "react";
import logo from "../../Helpers/images/prize.jpg";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Prizes = ({ navigation }) => {
  const [prizes, setPrizes] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const response = await fetch("https://localhost:7217/api/prize");
    const data = await response.json();
    console.log(data);
    setPrizes(data);
  }, []);

  const handleRedeemPrize = async (prizeCost) => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const response = await fetch(`https://localhost:7217/api/prize/${userId}`);
    const data = await response.json();
    console.log(response.status);
    let { balance } = data;
    if (balance > prizeCost) {
      console.log("User has enough points to redeem the prize");
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, balance, prizeCost }),
      };
      await fetch(`https://localhost:7217/api/prize/${userId}`, requestOptions);
      toast.success("Prize redeemed");
    } else {
      console.log("Prize costs more than user's balance");
      toast.error("Could not redeem prize");
    }
    console.log(balance);
  };

  return (
    <div class="container-sm">
      <div className="d-flex justify-content-end"></div>
      <h1>Prizų sąrašas</h1>
      <br />
      <div className="d-flex justify-content-center">
        {prizes.map((prize) => {
          return (
            <div class="card">
              <img class="card-img-top" src={logo} alt="Card image cap" />
              <div class="card-body text-center">
                <p class="card-text">
                  <b>{prize.name}</b>
                </p>
                <p class="card-text">Kaina (taškais): {prize.cost}</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleRedeemPrize(prize.cost)}
                >
                  Atsiimti prizą
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Prizes;
