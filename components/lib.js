import React from "react";
import { useCreatePerson } from "../utils/people";
import "twin.macro";

function usePersonForm() {
  const initialState = {
    name: "",
    phoneNumber: "",
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

function PersonForm() {
  const [personForm, setPersonForm] = usePersonForm();
  const createPerson = useCreatePerson();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPerson.mutate(personForm, {
      onSuccess: () => {
        setPersonForm();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div tw="my-4">
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          value={personForm.name}
          onChange={(e) => setPersonForm({ name: e.target.value })}
        />
      </div>
      <div tw="my-4">
        <label htmlFor="phoneNumber">Phone Number</label>
        <Input
          name="phoneNumber"
          value={personForm.phoneNumber}
          onChange={(e) => setPersonForm({ phoneNumber: e.target.value })}
        />
      </div>
      <input type="submit" value="Create Person" tw="px-4 py-2 rounded-md" />
    </form>
  );
}

export { PersonForm };
