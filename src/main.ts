import express from "express";

const app = express();
const port = 9999;

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
