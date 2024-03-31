import { useState, useEffect } from "react";
import { TodoItem } from "../types/TodoItem";
import { addTodo, deleteTodo, getTodoList, updateTodo } from "../utils/todoApi";

type UseTodoList = {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  handleChange: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: (newTodo: string) => void;
};

export const useTodoList = (): UseTodoList => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!todos.length && loading && !error)
      getTodoList()
        .then(({ data }) => {
          setTodos(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
  }, [todos, loading, error]);

  const handleChange = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      setError("Todo not found");
      return;
    }
    await updateTodo(id, !todo.done);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const onAdd = async (newTodo: string) => {
    try {
      const { data } = await addTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    todos,
    loading,
    error,
    handleChange,
    onAdd,
    onDelete,
  };
};
