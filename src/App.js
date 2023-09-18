import "./App.css";
import { useState } from "react";

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

export default function App() {
  const [items, setItems] = useState(DUMMY_DATA);
  const categories = Array.from(new Set(items.map((item) => item.category)));

  function handleAddNewItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => [...prevItems.filter((item) => item.id !== id)]);
  }

  return (
    <div className="app">
      <Card>
        <ShoppingList
          items={items}
          categories={categories}
          onDeleteItem={handleDeleteItem}
        />
      </Card>
      <Card>
        <InputForm
          items={items}
          onAddNewItem={handleAddNewItem}
          categories={categories}
        />
      </Card>
    </div>
  );
}
function Button({ children, type, onHandleClick, className }) {
  return (
    <button
      type={type ? type : "button"}
      className={`btn ${className || ""}`}
      onClick={() => {
        onHandleClick && onHandleClick();
      }}
    >
      {children}
    </button>
  );
}
function Card({ children }) {
  return <div className="card">{children}</div>;
}
function InputForm({ onAddNewItem, items, categories }) {
  // const itemCategories = ["Groceries", "Household Items", "Personal Care"];
  // const [itemCategories, setItemCategories] = useState([
  //   "Groceries",
  //   "Household Items",
  //   "Personal Care",
  // ]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [customCategory, setCustomCategory] = useState("");

  const isCustomCategory = category === "custom";

  //TODO: After adding an item to a custom cattegory, add the new category to the options

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      unit,
      price,
      category: customCategory ? customCategory : category,
    };

    onAddNewItem(newItem);
    setName("");
    setQuantity("");
    setUnit("pcs");
    setPrice("");
    setCategory(categories[0]);
    setCustomCategory("");
  }
  return (
    <form onSubmit={handleSubmit} className="inputForm">
      <h2>Add New Item to The Shopping List</h2>
      <label>Item name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      ></input>
      <label>Unit</label>
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
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
        onChange={(e) => setPrice(Number(e.target.value))}
      ></input>
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            onChange={(e) => setCustomCategory(e.target.value)}
          ></input>
        </>
      ) : (
        ""
      )}

      <Button type="submit">Add Item</Button>
    </form>
  );
}

function ShoppingList({ items, onDeleteItem, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredItems = items.filter((item) =>
    selectedCategory ? item.category === selectedCategory : item
  );

  // function reduceCategory(category, reduceBy) {
  //   items
  //     .filter((item) => item.category === category)
  //     .reduce((sum, reduceBy) => sum + reduceBy, 0);
  // }

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <Categories
        items={items}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ShoppingItems items={filteredItems} onDeleteItem={onDeleteItem} />
      <Total items={items} categories={categories} />
    </div>
  );
}
function Categories({
  categories,
  items,
  setSelectedCategory,
  selectedCategory,
}) {
  return (
    <ul className="categories">
      <li>
        <Button onHandleClick={() => setSelectedCategory("")}>All</Button>
      </li>
      {categories.map((category, i) => (
        <li key={i}>
          <Button
            className={category === selectedCategory ? "selected" : ""}
            onHandleClick={() => {
              if (category === selectedCategory) setSelectedCategory("");
              else setSelectedCategory(category);
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
function ShoppingItems({ items, onDeleteItem }) {
  return (
    <ul className="shopping-items">
      {items.map((item) => (
        <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li className="item">
      <Button
        className={"btn-delete"}
        onHandleClick={() => {
          const confirm = window.confirm(
            "Are you sure you want to delete the selected item?"
          );

          confirm && onDeleteItem(item.id);
        }}
      >
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

function Total({ items, categories }) {
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
        {items.reduce(
          (sumPrice, item) => sumPrice + item.quantity * item.price,
          0
        )}
      </li>
    </ul>
  );
}
