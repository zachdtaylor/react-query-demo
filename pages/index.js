import "twin.macro";
import Head from "next/head";
import Link from "next/link";
import { PersonForm } from "../components/lib";
import { usePeople } from "../utils/people";

export default function Home() {
  const people = usePeople();
  return (
    <div>
      <Head>
        <title>React Query Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main tw="m-4">
        {people &&
          people.map((person) => (
            <Link key={person._id} href={`/person/${person._id}`}>
              <a>{person.name}</a>
            </Link>
          ))}
        <PersonForm />
      </main>
    </div>
  );
}
