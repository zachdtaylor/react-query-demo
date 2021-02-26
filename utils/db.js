import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  return client.db("react-query-demo");
};

export { connectToDB };
