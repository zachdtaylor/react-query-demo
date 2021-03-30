import { Layout, PageInfo } from "../components/lib";
import { RegisterForm } from "../components/register-form";
import "twin.macro";

export default function Register() {
  return (
    <Layout>
      <PageInfo title="Register | Demo" />
      <main>
        <h1 tw="mb-4 font-bold">Register</h1>
        <RegisterForm />
      </main>
    </Layout>
  );
}
