import React from "react";
import { useCreatePerson, usePeople } from "../utils/people";
import "twin.macro";
import Link from "next/link";
import Head from "next/head";
import { FaSpinner } from "react-icons/fa";

const Spinner = ({ className }) => (
  <FaSpinner className={`animate-spin ${className}`} />
);

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
      tw="border-2 border-gray-500 rounded-md mx-2"
      {...props}
    />
  );
}

const Layout = ({ children }) => (
  <div tw="m-4">
    <div tw="my-4 ml-2 pb-2 border-b-2">
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
    <div tw="mx-2 my-6">{children}</div>
  </div>
);

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
      <div tw="mb-4">
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
      <button
        type="submit"
        tw="px-4 py-2 rounded-md bg-gray-800 text-white cursor-pointer"
        disabled={!formIsValid()}
      >
        {createPerson.isLoading ? <Spinner /> : "Create Person"}
      </button>
    </form>
  );
}

const PeopleCount = () => {
  const people = usePeople();
  return <div tw="my-4">There are {people.length} people</div>;
};

const PersonList = () => {
  const people = usePeople();
  return (
    <div tw="grid grid-flow-row grid-cols-5 gap-4">
      {people &&
        people.map((person) => (
          <Link key={person._id} href={`/person/${person._id}`}>
            <a tw="cursor-pointer">{person.name}</a>
          </Link>
        ))}
    </div>
  );
};

export { PersonForm, Layout, PageInfo, PeopleCount, PersonList, Spinner };
