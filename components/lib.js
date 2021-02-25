import React from "react";
import { useCreateTodo } from "../utils/todos";
import "twin.macro";

function useTodoForm() {
  const initialState = {
    name: "",
    description: "",
  };
  return React.useReducer(
    (o, n) => (n ? { ...o, ...n } : initialState),
    initialState
  );
}

function Input(props) {
  return (
    <input
      type="text"
      tw="border-2 border-gray-500 rounded-md mx-2"
      {...props}
    />
  );
}

function TodoForm() {
  const [todoForm, setTodoForm] = useTodoForm();
  const createTodo = useCreateTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo.mutate(todoForm, {
      onSuccess: () => {
        setTodoForm();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div tw="my-4">
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          value={todoForm.name}
          onChange={(e) => setTodoForm({ name: e.target.value })}
        />
      </div>
      <div tw="my-4">
        <label htmlFor="description">Description</label>
        <Input
          name="description"
          value={todoForm.description}
          onChange={(e) => setTodoForm({ description: e.target.value })}
        />
      </div>
      <input type="submit" value="Create Todo" tw="px-4 py-2 rounded-md" />
    </form>
  );
}

export { TodoForm };
