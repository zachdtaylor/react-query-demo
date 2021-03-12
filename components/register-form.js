import React from "react";
import { FormItem, Input, SubmitButton } from "./lib";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem htmlFor="email" label="Email">
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormItem>
      <FormItem htmlFor="password" label="Password">
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormItem>
      <FormItem htmlFor="confirmPassword" label="Confirm Password">
        <Input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormItem>
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  );
};

export { RegisterForm };