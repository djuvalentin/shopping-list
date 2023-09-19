import { useShoppingList } from "../contexts/ShoppingListContext";
import { Button } from "./Button";

export function Categories() {
  const { categories, items, selectedCategory, dispatch } = useShoppingList();
  return (
    <ul className="categories">
      <li>
        <Button
          onHandleClick={() =>
            dispatch({ type: "category/selected", payload: "" })
          }
        >
          All
        </Button>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Button
            className={category === selectedCategory ? "selected" : ""}
            onHandleClick={() => {
              if (category === selectedCategory)
                dispatch({ type: "category/selected", payload: "" });
              else
                dispatch({
                  type: "category/selected",
                  payload: category,
                });
            }}
          >
            {category} (
            {items
              .filter((item) => item.category === category)
              .reduce((itemCount, item) => itemCount + item.quantity, 0)}
            )
          </Button>
        </li>
      ))}
    </ul>
  );
}
