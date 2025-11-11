import "./PizzaMenu.css";
import { Pizza } from "../../types"; // on importe le type pour bien typer la prop

interface PizzaMenuProps {
  pizzas: Pizza[]; // le composant attend un tableau de pizzas
}

const PizzaMenu = ({ pizzas }: PizzaMenuProps) => {
  return (
    <table className="pizza-menu">
      <thead>
        <tr>
          <th>Pizza</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {pizzas.map((pizza) => (
          <tr key={pizza.id}>
            <td>{pizza.title}</td>
            <td>{pizza.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PizzaMenu;
