import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "./api-client";

function usePeople() {
  const { data } = useQuery("people", () => client("/api/people"));
  return data ?? [];
}

function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation((data) => client("/api/people", { data }), {
    onSuccess: () => {
      queryClient.invalidateQueries("people");
    },
  });
}

function useDeletePerson() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => client(`/api/people/${id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("people");
      },
    }
  );
}

const loadingPerson = {
  id: 0,
  name: "Loading...",
  phoneNumber: "Loading...",
};
function usePerson(id) {
  const { data } = useQuery(["person", id], () => client(`/api/people/${id}`));
  return data || loadingPerson;
}

export { usePeople, useCreatePerson, useDeletePerson, usePerson };
