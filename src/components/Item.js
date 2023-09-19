import { useShoppingList } from "../contexts/ShoppingListContext";
import { Button } from "./Button";

export function Item({ item }) {
  const { dispatch } = useShoppingList();

  function handleDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete the selected item?"
    );

    confirm && dispatch({ type: "item/removed", payload: item.id });
  }

  return (
    <li className="item">
      <Button className={"btn-delete"} onHandleClick={handleDelete}>
        Delete
      </Button>
      <div className="item-info">
        <span>{item.name}</span>
        <span>
          {item.quantity} {item.unit}
        </span>
        <span className="price-cell">{item.price}€</span>
        <span className="price-cell">{item.quantity * item.price}€</span>
      </div>
    </li>
  );
}
