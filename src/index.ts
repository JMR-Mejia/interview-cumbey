import express from "express";
import cors from "cors";
import helmet from "helmet";

import { port } from "./config";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening in https://localhost:${port}`);
});
