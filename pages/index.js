import "twin.macro";
import Head from "next/head";
import { TodoForm } from "../components/lib";
import { useTodos } from "../utils/todos";

export default function Home() {
  const todos = useTodos();
  return (
    <div>
      <Head>
        <title>React Query Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main tw="m-4">
        {todos && todos.map((todo) => <p key={todo.id}>{todo.name}</p>)}
        <TodoForm />
      </main>
    </div>
  );
}
