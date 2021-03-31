import React from "react";
import { client } from "../utils/api-client";
import { range } from "../utils/misc";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const usePersonForm = () => {
  const initialState = {
    name: "",
    phoneNumber: "",
    isValid: function () {
      return this.name !== "" && this.phoneNumber !== "";
    },
  };
  return React.useReducer(
    (o, n) => (n ? { ...o, ...n } : initialState),
    initialState
  );
};

export const usePepole = () => {
  return useQuery("people", () => client("/api/people"), {
    placeholderData: range(5).map((_id) => ({ _id, name: "Loading..." })),
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  return useMutation(({ data }) => client("/api/people", { data }), {
    onSuccess: () => {
      queryClient.invalidateQueries("people");
    },
  });
};
