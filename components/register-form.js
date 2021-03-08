import React from "react";
import { FormItem, Input, SubmitButton } from "./lib";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
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
      <FormItem htmlFor="firstName" label="First Name">
        <Input
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormItem>
      <FormItem htmlFor="lastName" label="Last Name">
        <Input
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
