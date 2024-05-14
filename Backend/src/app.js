import express from "express";
import { connect } from "./config/connect.js";
const app = express();
console.log(process.env.DB_URI);
app.use(express.json());
connect(process.env.DB_URI);

app.listen(process.env.PORT, () => {
  console.log("http:localhost:" + process.env.PORT);
});
