import { useRouter } from "next/router";
import { usePerson } from "../../utils/people";

export default function Person() {
  const router = useRouter();
  const { id } = router.query;
  const person = usePerson(id);

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Phone: {person.phoneNumber}</p>
    </div>
  );
}
