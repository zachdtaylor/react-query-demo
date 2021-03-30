import React from "react";
import "twin.macro";
import {
  PersonForm,
  Layout,
  PageInfo,
  PersonList,
  PeopleCount,
} from "../components/lib";
import { client } from "../utils/api-client";
import { range } from "../utils/misc";

export default function Home() {
  const [people, setPeople] = React.useState(
    range(5).map((_id) => ({ _id, name: "Loading..." }))
  );
  const [error, setError] = React.useState(null);

  const fetchPeople = async () => {
    try {
      const data = await client("/api/people");
      setPeople(data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  React.useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <Layout>
      <PageInfo title="Home | Demo" />

      <main>
        <PeopleCount people={people} error={error} />
        <div tw="grid grid-cols-2 gap-4">
          <PersonForm fetchPeople={fetchPeople} />
          <PersonList people={people} error={error} />
        </div>
      </main>
    </Layout>
  );
}
