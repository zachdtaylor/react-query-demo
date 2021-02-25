import axios from "axios";

async function client(endpoint, { data } = {}) {
  const config = {
    method: data ? "POST" : "GET",
    baseURL: "http://localhost:3000",
    url: endpoint,
    headers: {
      "Content-Type": data ? "application/json" : undefined,
    },
    data,
  };
  const response = await axios(config);
  return response.data;
}

export { client };
