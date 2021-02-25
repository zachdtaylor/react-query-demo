// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let id = 1;
const todos = [{ id: 1, name: "Build demo" }];

export default function handler(req, res) {
  if (req.method === "POST") {
    id += 1;
    todos.push({ id, ...req.body });
    return res.status(200).json({ message: "Successfully created todo" });
  } else {
    return res.status(200).json(todos);
  }
}
