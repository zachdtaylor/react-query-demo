import "twin.macro";
import {
  PersonForm,
  Layout,
  PageInfo,
  PeopleCount,
  PersonList,
} from "../components/lib";

export default function Home() {
  return (
    <Layout>
      <PageInfo title="Home | Demo" />

      <main>
        <PeopleCount />
        <div tw="grid grid-cols-2 gap-4">
          <PersonForm />
          <PersonList />
        </div>
      </main>
    </Layout>
  );
}
