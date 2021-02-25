import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "./api-client";

function useTodos() {
  const { data } = useQuery("todos", () => client("/api/todos"));
  return data;
}

function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation((data) => client("/api/todos", { data }), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
}

export { useTodos, useCreateTodo };
