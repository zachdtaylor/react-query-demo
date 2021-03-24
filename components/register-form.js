import React from "react";
import { FormItem, Input, SubmitButton } from "./lib";

const useRegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };
};

const RegisterForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useRegisterForm();

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
