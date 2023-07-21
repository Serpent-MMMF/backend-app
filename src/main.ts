import express from "express";
import { userRepo } from "./repo/user";

const app = express();
const port = 9999;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", async (req, res) => {
  const users = await userRepo.findMany();

  res.send(users);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
