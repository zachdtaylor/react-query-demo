import React from "react";
import { useRouter } from "next/router";
import { Error, Layout, PageInfo, Spinner } from "../../components/lib";
import "twin.macro";
import { client } from "../../utils/api-client";
import { useMutation, useQuery } from "react-query";

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  const person = useQuery(["person", id], () => client(`/api/people/${id}`), {
    placeholderData: {
      name: "Loading...",
      phoneNumber: "Loading...",
    },
    staleTime: 60 * 5 * 1000,
    cacheTime: 5000,
  });
  const deletePerson = useMutation(
    ({ id }) => client(`/api/people/${id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );

  const handleDelete = () => {
    deletePerson.mutate({ id });
  };

  return (
    <Layout>
      <PageInfo title={`Person Details - ${person.data.name} | Demo`} />
      {person.isError ? (
        <Error>{person.error.message}</Error>
      ) : (
        <div tw="my-4">
          <p>Name: {person.data.name}</p>
          <p>Phone: {person.data.phoneNumber}</p>
        </div>
      )}
      <button
        tw="px-4 py-2 bg-red-600 text-white rounded-md"
        onClick={handleDelete}
      >
        {deletePerson.isLoading ? <Spinner /> : "Delete"}
      </button>
      {deletePerson.isError && <Error>{deletePerson.error.message}</Error>}
    </Layout>
  );
}
