import React from "react";
import { useCreatePerson, usePepole, usePersonForm } from "../utils/people";
import "twin.macro";
import Link from "next/link";
import Head from "next/head";
import { FaSpinner } from "react-icons/fa";
import { client } from "../utils/api-client";
import { useMutation } from "react-query";

export const Spinner = () => <FaSpinner tw="animate-spin" />;

export const Error = ({ children }) => <p tw="text-red-500 py-2">{children}</p>;

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

export const PersonForm = () => {
  const createPerson = useCreatePerson();
  const [personForm, setPersonForm] = usePersonForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (personForm.isValid()) {
      createPerson.mutate(
        { data: personForm },
        {
          onSuccess: () => {
            setPersonForm();
          },
        }
      );
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
      <SubmitButton>
        {createPerson.isLoading ? <Spinner /> : "Create Person"}
      </SubmitButton>
      {createPerson.isError && <Error>{createPerson.error.message}</Error>}
    </form>
  );
};

export const PeopleCount = () => {
  const people = usePepole();
  return (
    <div tw="my-4">
      {people.isError ? (
        <Error>{people.error.message}</Error>
      ) : (
        `There are ${people.data.length} people`
      )}
    </div>
  );
};

export const PersonList = () => {
  const people = usePepole();
  if (people.isError) {
    return <Error>{people.error.message}</Error>;
  }

  return (
    <div tw="grid grid-flow-row grid-cols-5 gap-4">
      {people.data &&
        people.data.map((person) => (
          <Link key={person._id} href={`/person/${person._id}`}>
            <a tw="grid items-center justify-items-center cursor-pointer">
              {person.name}
            </a>
          </Link>
        ))}
    </div>
  );
};
