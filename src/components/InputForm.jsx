import { useContext, useState } from "react";
import { CartContext } from "../App";
import SuccessPage from "./SuccessPage";

function Input({ label, ...props }) {
  return (
    <div className="control">
      <label>{label}</label>
      <input {...props} required />
    </div>
  );
}

export default function InputForm({ onClose, setInCheckout }) {
  const { selectedMeals, setSelectedMeals } = useContext(CartContext);
  const [error, setError] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartTotal = selectedMeals.reduce((acc, el) => {
    return acc + el.price * el.quantity;
  }, 0);
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const orderData = {
      items: selectedMeals,
      customer: data,
    };
    submitOrder(orderData);
  }

  async function submitOrder(orderData) {
    try {
      const response = await fetch("https://api.render.com/deploy/srv-cqk6t2iju9rs738hgatg?key=Z4HejqYR-iM/orders", {
        method: "POST",
        body: JSON.stringify({ order: orderData }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not Place the Error");
      }
      setSelectedMeals([]);
      setOrderPlaced(true);
    } catch (error) {
      setError(error);
    }
  }
  if (error) {
    alert(`An Error Ocurred.     Message: ${error.message}`);
  }
  return (
    <>
      {orderPlaced ? (
        <SuccessPage
          setOrderPlaced={setOrderPlaced}
          setInCheckout={setInCheckout}
        />
      ) : (
        <div className="cart">
          <h2>Checkout</h2>
          <p>Total Amount: ${cartTotal}</p>
          <form onSubmit={handleSubmit}>
            <Input label="Full Name" type="text" name="name" />
            <Input label="E-mail Address" type="email" name="email" />
            <Input label="Street" type="text" name="street" />
            <div className="control-row">
              <Input label="Postal Code" type="text" name="postal-code" />
              <Input label="City" type="text" name="city" />
            </div>
            <br></br>
            <div className="modal-actions">
              <button type="reset" onClick={onClose} className="text-button">
                Close
              </button>
              <button type="submit" className="button">
                Submit Order
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
