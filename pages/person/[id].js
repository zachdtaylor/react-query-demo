import React from "react";
import { useRouter } from "next/router";
import { Error, Layout, PageInfo, Spinner } from "../../components/lib";
import "twin.macro";
import { client } from "../../utils/api-client";

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = React.useState({
    name: "Loading...",
    phoneNumber: "Loading...",
  });
  const [personError, setPersonError] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(null);

  React.useEffect(() => {
    const fetchPerson = async () => {
      setPersonError(null);
      client(`/api/people/${id}`)
        .then((data) => setPerson(data))
        .catch((error) => setPersonError(error));
    };
    fetchPerson();
  }, [id]);

  const handleDelete = () => {
    setDeleteLoading(true);
    setDeleteError(null);
    client(`/api/people/${id}`, { method: "DELETE" })
      .then(() => {
        setDeleteLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setDeleteLoading(false);
        setDeleteError(error);
      });
  };

  return (
    <Layout>
      <PageInfo title={`Person Details - ${person.name} | Demo`} />
      {personError ? (
        <Error>{personError.message}</Error>
      ) : (
        <div tw="my-4">
          <p>Name: {person.name}</p>
          <p>Phone: {person.phoneNumber}</p>
        </div>
      )}
      <button
        tw="px-4 py-2 bg-red-600 text-white rounded-md"
        onClick={handleDelete}
      >
        {deleteLoading ? <Spinner /> : "Delete"}
      </button>
      {deleteError && <Error>{deleteError.message}</Error>}
    </Layout>
  );
}
