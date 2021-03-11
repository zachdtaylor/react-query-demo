import React from "react";

export function usePersonForm() {
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
}
