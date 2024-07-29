import { useContext } from "react";
import { CartContext } from "../App";

export default function ({ setOrderPlaced, setInCheckout }) {
  const { setIsModalOpen } = useContext(CartContext);
  return (
    <div className="cart">
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes
      </p>
      <div className="modal-actions">
        <button
          onClick={() => {
            setIsModalOpen(false);
            setOrderPlaced(false);
            setInCheckout(false);
          }}
          className="button"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
