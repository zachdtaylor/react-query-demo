import React from "react";
import { useCreatePerson, usePeople, usePersonForm } from "../utils/people";
import "twin.macro";
import Link from "next/link";
import Head from "next/head";
import { FaSpinner } from "react-icons/fa";

const Spinner = ({ className }) => (
  <FaSpinner className={`animate-spin ${className}`} />
);

const PageInfo = ({ title }) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

function Input(props) {
  return (
    <input
      type="text"
      tw="border-2 border-gray-500 rounded-md mx-2 px-2 py-1 focus:(outline-none)"
      {...props}
    />
  );
}

const Layout = ({ children }) => (
  <div tw="m-4">
    <div tw="my-4 ml-2 pb-2 border-b-2">
      <Link href="/">
        <a tw="mx-4 cursor-pointer">Home</a>
      </Link>
      <Link href="/register">
        <a tw="mx-4 cursor-pointer">Register Form</a>
      </Link>
    </div>
    <div tw="mx-2 my-6">{children}</div>
  </div>
);

const FormItem = ({ htmlFor, label, children }) => {
  return (
    <div tw="mb-4">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
};

const SubmitButton = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      tw="px-4 py-2 rounded-md bg-gray-800 text-white cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

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

  const formIsValid = () => {
    return personForm.name !== "" && personForm.phoneNumber !== "";
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
      <SubmitButton disabled={!formIsValid()}>
        {createPerson.isLoading ? <Spinner /> : "Create Person"}
      </SubmitButton>
    </form>
  );
}

const PeopleCount = () => {
  const people = usePeople();
  return (
    <div tw="my-4">
      There are {people.isLoading ? "?" : people.data.length} people
    </div>
  );
};

const PersonList = () => {
  const people = usePeople();
  return (
    <div tw="grid grid-flow-row grid-cols-5 gap-4">
      {people.isSuccess &&
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

export {
  PersonForm,
  Layout,
  PageInfo,
  PeopleCount,
  PersonList,
  Spinner,
  FormItem,
  Input,
  SubmitButton,
};
