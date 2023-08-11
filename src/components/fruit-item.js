import Button from "./button";
import { Badge } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FruitItem({
  item,
  quantityIncrement,
  quantityDecrement
}) {
  return (
    <div className="fruit-item rounded d-flex justify-content-between">
      <div>{item.name}</div>
      <div>
        <Button onClick={() => quantityDecrement(item.id)}>
          <FiMinus />
        </Button>
        <Badge bg={"default"} className="p-2 badge-quantity">
          {item.quantity}
        </Badge>
        <Button onClick={() => quantityIncrement(item.id)}>
          <FiPlus />
        </Button>
      </div>
    </div>
  );
}
