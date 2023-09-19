import { createContext, useContext, useReducer } from "react";

const DUMMY_DATA = [
  {
    id: "1",
    name: "Apples",
    quantity: 5,
    unit: "pcs",
    price: 1.5,
    category: "Groceries",
  },
  {
    id: "2",
    name: "Dish Soap",
    quantity: 1,
    unit: "bottle",
    price: 3.99,
    category: "Household Items",
  },
  {
    id: "3",
    name: "Toothpaste",
    quantity: 2,
    unit: "tube",
    price: 2.49,
    category: "Personal Care",
  },
];

const ShoppingListContext = createContext();

const initialState = {
  items: DUMMY_DATA,
  selectedCategory: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "item/added":
      return { ...state, items: [...state.items, action.payload] };
    case "item/removed":
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== action.payload)],
      };
    case "category/selected":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      throw new Error(`Action ${action.type} is not defined`);
  }
}

function ShoppingListProvider({ children }) {
  const [{ items, selectedCategory }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <ShoppingListContext.Provider
      value={{ items, categories, selectedCategory, dispatch }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined)
    throw new Error(
      "ShoppingListContext used outside of the ShoppingListProvider"
    );
  return context;
}

export { ShoppingListProvider, useShoppingList };
