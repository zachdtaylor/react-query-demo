import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "./api-client";

function usePeople() {
  return useQuery("person", () => client("/api/people"), {
    placeholderData: [{ id: 1, name: "Loading..." }],
  });
}

function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation((data) => client("/api/people", { data }), {
    onSuccess: () => {
      queryClient.invalidateQueries("person");
    },
  });
}

function useDeletePerson() {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => client(`/api/people/${id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("person");
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
  return useQuery(["person", id], () => client(`/api/people/${id}`), {
    placeholderData: loadingPerson,
  });
}

export { usePeople, useCreatePerson, useDeletePerson, usePerson };
