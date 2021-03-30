import React from "react";
import { FormItem, Input, SubmitButton } from "./lib";

const RegisterForm = () => {
  const [form, setForm] = React.useReducer(
    (state, update) => ({ ...state, ...update }),
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem htmlFor="email" label="Email">
        <Input
          name="email"
          value={form.email}
          onChange={(e) => setForm({ email: e.target.value })}
        />
      </FormItem>
      <FormItem htmlFor="password" label="Password">
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ password: e.target.value })}
        />
      </FormItem>
      <FormItem htmlFor="confirmPassword" label="Confirm Password">
        <Input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ confirmPassword: e.target.value })}
        />
      </FormItem>
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  );
};

export { RegisterForm };
