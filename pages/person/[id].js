import React from "react";
import { useRouter } from "next/router";
import { Layout, PageInfo } from "../../components/lib";
import "twin.macro";
import { client } from "../../utils/api-client";

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = React.useState({
    name: "Loading...",
    phoneNumber: "Loading...",
  });

  React.useEffect(() => {
    const fetchPerson = async () => {
      client(`/api/people/${id}`)
        .then((data) => setPerson(data))
        .catch((error) => console.log(error));
    };
    fetchPerson();
  }, [id]);

  const handleDelete = () => {
    client(`/api/people/${id}`, { method: "DELETE" }).then(() =>
      router.push("/")
    );
  };

  return (
    <Layout>
      <PageInfo title={`Person Details - ${person.name} | Demo`} />
      <div tw="my-4">
        <p>Name: {person.name}</p>
        <p>Phone: {person.phoneNumber}</p>
      </div>
      <button
        tw="px-4 py-2 bg-red-600 text-white rounded-md"
        onClick={handleDelete}
      >
        Delete
      </button>
    </Layout>
  );
}
