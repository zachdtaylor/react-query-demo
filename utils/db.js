import { MongoClient } from "mongodb";

export const connectToDB = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("react-query-demo");
};
