import { useRouter } from "next/router";
import { Layout, PageInfo, Spinner } from "../../components/lib";
import { useDeletePerson, usePerson } from "../../utils/people";
import "twin.macro";

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  const person = usePerson(id);
  const deletePerson = useDeletePerson();

  const handleDelete = () => {
    deletePerson.mutate(id, {
      onSuccess: () => router.push("/"),
    });
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
        {deletePerson.isLoading ? <Spinner /> : "Delete"}
      </button>
    </Layout>
  );
}
