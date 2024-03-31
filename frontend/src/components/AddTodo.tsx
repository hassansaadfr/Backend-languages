import { FC, useState } from "react";

type AddTodoProps = {
  onAdd: (newTodo: string) => void;
};

export const AddTodo: FC<AddTodoProps> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleClick = () => {
    onAdd(newTodo);
    setNewTodo("");
  };

  return (
    <div>
      <input onChange={handleChange} type="text" value={newTodo} />
      <button disabled={!newTodo} onClick={handleClick}>
        Add
      </button>
    </div>
  );
};
