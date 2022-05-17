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

  const handleRedeemPrize = async (prizeId) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    let userId = JSON.parse(localStorage.getItem("userId"));

    const response = await fetch(
      `https://localhost:7217/api/prize/${userId}/${prizeId}`,
      requestOptions
    );

    if (response.ok) {
      toast.success("Prize redeemed");
    } else {
      toast.error("Could not redeem prize");
    }
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
                  onClick={() => handleRedeemPrize(prize.id)}
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
