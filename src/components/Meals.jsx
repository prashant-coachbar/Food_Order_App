import { useContext } from "react";
import { CartContext } from "../App";

export default function Meals({ isFetching }) {
  const { setSelectedMeals, availableMeals: meals } = useContext(CartContext);

  function handleAddMeal(id) {
    setSelectedMeals((prev) => {
      if (prev.filter((item) => item.id === id).length > 0) {
        return [...prev];
      } else {
        const index = meals.findIndex((item) => item.id === id);
        const obj = {
          id: id,
          name: meals[index].name,
          price: meals[index].price,
          quantity: 1,
        };
        return [...prev, obj];
      }
    });
  }

  return (
    <>
      {isFetching && <p>Please Wait the meal items are loading.....</p>}
      {!isFetching && meals.length === 0 && <p>No meals Available</p>}
      <ul id="meals">
        {!isFetching &&
          meals.length > 0 &&
          meals.map((item) => (
            <li key={item.id} className="meal-item">
              <article>
                <img src={`http://localhost:3000/${item.image}`} />
                <h3>{item.name}</h3>
                <p>
                  <span className="meal-item-price">${item.price}</span>
                </p>
                <p className="meal-item-description">{item.description}</p>
                <p>
                  <button
                    onClick={() => {
                      handleAddMeal(item.id);
                    }}
                    className="button meal-item-actions"
                  >
                    Add to Cart
                  </button>
                </p>
              </article>
            </li>
          ))}
      </ul>
    </>
  );
}
