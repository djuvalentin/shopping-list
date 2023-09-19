import "./App.css";
import { Card } from "./Card";
import { Categories } from "./Categories";
import { InputForm } from "./InputForm";
import { ShoppingItems } from "./ShoppingItems";
import { ShoppingList } from "./ShoppingList";
import { Total } from "./Total";

export default function App() {
  return (
    <div className="app">
      <Card>
        <ShoppingList>
          <Categories />
          <ShoppingItems />
          <Total />
        </ShoppingList>
      </Card>
      <Card>
        <InputForm />
      </Card>
    </div>
  );
}
