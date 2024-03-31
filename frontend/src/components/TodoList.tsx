import { Todo } from "./Todo";
import { useTodoList } from "../hooks/UseTodoList";
import { AddTodo } from "./AddTodo";

const TodoList = () => {
  const { loading, todos, error, handleChange, onAdd, onDelete } =
    useTodoList();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <AddTodo onAdd={onAdd} />
      {todos.map(({ id, text, done }) => {
        return (
          <Todo
            onChange={handleChange}
            onDelete={onDelete}
            key={id}
            id={id}
            done={done}
            text={text}
          />
        );
      })}
    </div>
  );
};

export { TodoList };
