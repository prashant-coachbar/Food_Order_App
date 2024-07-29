import { createContext, useState } from "react";
import AvailableMeals from "./components/AvailableMeals";
import Header from "./components/Header";
import Modal from "./components/Modal";

export const CartContext = createContext({
  selectedMeals: [],
  setSelectedMeals: null,
  availableMeals: [],
  setAvailableMeals: null,
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);
  function handleOpenCart() {
    setIsModalOpen(true);
  }
  function handleRemoveCart() {
    setIsModalOpen(false);
    console.log("Modal Removed");
  }

  const ctxValue = {
    selectedMeals: selectedMeals,
    availableMeals: availableMeals,
    setSelectedMeals: setSelectedMeals,
    setAvailableMeals: setAvailableMeals,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <Header handleCartClick={handleOpenCart} />
      <AvailableMeals />
      <Modal open={isModalOpen} onClose={handleRemoveCart} />
    </CartContext.Provider>
  );
}

export default App;

// components for displaying products, cart in modal, checkoutform in modal
// Fetch meals data from backend and show it (Get/meals)
// allow users to add/remove products from cart
// send cart data with user data(full name,email,street,postalcode,city) to backend(post/orders)
// handle loading & error states
