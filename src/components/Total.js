import { useShoppingList } from "../contexts/ShoppingListContext";

export function Total() {
  const { items, categories } = useShoppingList();

  return (
    <ul className="totals">
      {categories.map((category, i) => (
        <li key={i}>
          {category}:{" "}
          {items
            .filter((item) => item.category === category)
            .reduce(
              (sumPrice, item) => sumPrice + item.quantity * item.price,
              0
            )}
          €
        </li>
      ))}
      <li className="total">
        Total:{" "}
        {items
          .reduce((sumPrice, item) => sumPrice + item.quantity * item.price, 0)
          .toFixed(2)}
        €
      </li>
    </ul>
  );
}
