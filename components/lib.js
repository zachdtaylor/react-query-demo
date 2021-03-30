import React from "react";
import { usePersonForm } from "../utils/people";
import "twin.macro";
import Link from "next/link";
import Head from "next/head";
import { FaSpinner } from "react-icons/fa";
import { client } from "../utils/api-client";

export const Spinner = () => <FaSpinner tw="animate-spin" />;

export const PageInfo = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export const Input = (props) => {
  return (
    <input
      type="text"
      tw="border-2 border-gray-500 rounded-md mx-2 px-2 py-1 focus:(outline-none)"
      {...props}
    />
  );
};

export const Layout = ({ children }) => (
  <div tw="m-4">
    <div tw="my-4 ml-2 pb-2 border-b-2">
      <Link href="/">
        <a tw="mx-4 cursor-pointer">Home</a>
      </Link>
    </div>
    <div tw="mx-2 my-6">{children}</div>
  </div>
);

export const FormItem = ({ htmlFor, label, children }) => {
  return (
    <div tw="mb-4">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
};

export const SubmitButton = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      tw="px-4 py-2 rounded-md bg-gray-800 text-white cursor-pointer focus:(outline-none)"
      {...props}
    >
      {children}
    </button>
  );
};

export const PersonForm = ({ fetchPeople }) => {
  const [personForm, setPersonForm] = usePersonForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (personForm.isValid()) {
      client("/api/people", { data: personForm }).then(() => {
        setPersonForm();
        fetchPeople();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem label="Name" htmlFor="name">
        <Input
          name="name"
          value={personForm.name}
          onChange={(e) => setPersonForm({ name: e.target.value })}
        />
      </FormItem>
      <FormItem label="Phone Number" htmlFor="phoneNumber">
        <Input
          name="phoneNumber"
          value={personForm.phoneNumber}
          onChange={(e) => setPersonForm({ phoneNumber: e.target.value })}
        />
      </FormItem>
      <SubmitButton>Create Person</SubmitButton>
    </form>
  );
};

export const PeopleCount = ({ people }) => {
  return <div tw="my-4">There are {people.length} people</div>;
};

export const PersonList = ({ people }) => {
  return (
    <div tw="grid grid-flow-row grid-cols-5 gap-4">
      {people &&
        people.map((person) => (
          <Link key={person._id} href={`/person/${person._id}`}>
            <a tw="grid items-center justify-items-center cursor-pointer">
              {person.name}
            </a>
          </Link>
        ))}
    </div>
  );
};
