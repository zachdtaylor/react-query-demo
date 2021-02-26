import { connectToDB } from "../../../utils/db";
import { ObjectID } from "mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;
  const db = await connectToDB();
  const person = await db.collection("people").findOne({ _id: ObjectID(id) });
  return res.status(200).json(person);
}
