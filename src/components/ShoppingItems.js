import { useShoppingList } from "../contexts/ShoppingListContext";
import { Item } from "./Item";

export function ShoppingItems() {
  const { items, selectedCategory } = useShoppingList();

  const displayedItems =
    selectedCategory === ""
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <ul className="shopping-items">
      {displayedItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}
