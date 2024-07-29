import { useContext } from "react";
import { CartContext } from "../App";

export default function Cart({ onClose, onOpen }) {
  const { selectedMeals, setSelectedMeals } = useContext(CartContext);
  const cartTotal = selectedMeals.reduce((acc, el) => {
    return acc + el.price * el.quantity;
  }, 0);
  function handlePlus(id) {
    setSelectedMeals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function handleMinus(id) {
    setSelectedMeals((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updated.filter((item) => item.quantity > 0);
    });
  }
  if (selectedMeals.length === 0) {
    onClose();
  }
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {selectedMeals.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.quantity} x ${item.price}{" "}
            </p>
            <div className="cart-item-actions">
              <button
                onClick={() => {
                  handleMinus(item.id);
                }}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => {
                  handlePlus(item.id);
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>
        <span className="cart-total">{cartTotal}</span>
      </p>
      <div className="modal-actions">
        <button onClick={onClose} className="text-button">
          Close
        </button>
        <button onClick={onOpen} className="button">
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
