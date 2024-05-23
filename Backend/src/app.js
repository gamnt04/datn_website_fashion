import express from "express";
import cors from "cors";
import { connect } from "./config/connect.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();
console.log(process.env.DB_URI);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
connect(process.env.DB_URI);

app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log("http:localhost:" + process.env.PORT);
});
