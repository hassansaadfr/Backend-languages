import { FC } from "react";
import { TodoItem } from "../types/TodoItem";

type TodoProps = TodoItem & {
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
};

export const Todo: FC<TodoProps> = ({ id, done, text, onChange, onDelete }) => {
  return (
    <div>
      <input onChange={() => onChange(id)} type="checkbox" checked={done} />
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
