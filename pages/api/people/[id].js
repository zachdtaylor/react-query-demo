import { connectToDB } from "../../../utils/db";
import { ObjectID } from "mongodb";
import { sleep } from "../../../utils/misc";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  const db = await connectToDB();
  await sleep(300);
  switch (method) {
    case "DELETE":
      await db.collection("people").deleteOne({ _id: ObjectID(id) });
      return res
        .status(200)
        .json({ message: `successfully deleted person ${id}` });
    default:
      const person = await db
        .collection("people")
        .findOne({ _id: ObjectID(id) });
      return res.status(200).json(person);
  }
}
