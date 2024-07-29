import { useContext } from "react";
import logo from "../assets/logo.jpg";
import { CartContext } from "../App";
export default function Header({ handleCartClick }) {
  const { selectedMeals } = useContext(CartContext);
  return (
    <section id="main-header">
      <div id="title">
        <img src={logo} alt="A good looking burger" />
        <h1>reactfood</h1>
      </div>
      <button className="text-button" onClick={handleCartClick}>
        Cart({selectedMeals.length})
      </button>
    </section>
  );
}
