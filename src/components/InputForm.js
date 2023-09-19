import { useReducer } from "react";
import { Button } from "./Button";
import { useShoppingList } from "../contexts/ShoppingListContext";

const initialState = {
  name: "",
  quantity: "",
  unit: "pcs",
  price: "",
  category: "",
  customCategory: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "name/changed":
      return { ...state, name: action.payload };
    case "quantity/changed":
      return { ...state, quantity: action.payload };
    case "unit/changed":
      return { ...state, unit: action.payload };
    case "price/changed":
      return { ...state, price: action.payload };
    case "category/changed":
      return { ...state, category: action.payload, customCategory: "" };
    case "customCategory/changed":
      return { ...state, customCategory: action.payload };
    case "reset":
      return { ...initialState, category: action.payload };
    default:
      throw new Error(`Action type ${action.type} is not defined`);
  }
}

export function InputForm() {
  const { categories, dispatch: dispatchShoppingList } = useShoppingList();
  const [
    { name, quantity, unit, price, category, customCategory },
    dispatchForm,
  ] = useReducer(reducer, { ...initialState, category: categories[0] });

  const isCustomCategory = category === "custom";

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      unit,
      price,
      category: isCustomCategory ? customCategory : category,
    };

    dispatchShoppingList({ type: "item/added", payload: newItem });
    dispatchForm({ type: "reset", payload: categories[0] });
  }
  return (
    <form onSubmit={handleSubmit} className="inputForm">
      <h2>Add New Item to The Shopping List</h2>
      <label>Item name</label>
      <input
        type="text"
        value={name}
        onChange={(e) =>
          dispatchForm({ type: "name/changed", payload: e.target.value })
        }
        required
      ></input>
      <label>Quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          dispatchForm({
            type: "quantity/changed",
            payload: Number(e.target.value),
          })
        }
        required
      ></input>
      <label>Unit</label>
      <select
        value={unit}
        onChange={(e) =>
          dispatchForm({ type: "unit/changed", payload: e.target.value })
        }
      >
        <option value="pcs">pcs</option>
        <option value="bottle">bottle</option>
        <option value="tube">tube</option>
        <option value="kg">kg</option>
        <option value="gr">gr</option>
        <option value="oz">oz</option>
        <option value="l">l</option>
        <option value="gl">gl</option>
      </select>
      <label>Price €/{unit}</label>
      <input
        type="number"
        value={price}
        onChange={(e) =>
          dispatchForm({
            type: "price/changed",
            payload: Number(e.target.value),
          })
        }
        required
      ></input>
      <label>Category</label>
      <select
        value={category}
        onChange={(e) =>
          dispatchForm({ type: "category/changed", payload: e.target.value })
        }
      >
        {categories.map((category, i) => (
          <option key={i} value={category}>
            {category}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>
      {isCustomCategory ? (
        <>
          <label>Custom category name</label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) =>
              dispatchForm({
                type: "customCategory/changed",
                payload: e.target.value,
              })
            }
            required
          ></input>
        </>
      ) : (
        ""
      )}

      <Button type="submit">Add Item</Button>
    </form>
  );
}
