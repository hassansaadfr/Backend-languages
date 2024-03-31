import axios from "axios";

export const getTodoList = async () => {
  return axios.get("http://localhost:8080/todos");
};

export const addTodo = async (newTodo: string) => {
  return axios.post("http://localhost:8080/todos", {
    text: newTodo,
    done: false,
  });
};

export const deleteTodo = async (id: number) => {
  return axios.delete(`http://localhost:8080/todos/${id}`);
};

export const updateTodo = async (id: number, done: boolean) => {
  return axios.put(`http://localhost:8080/todos/${id}`, { done });
};
