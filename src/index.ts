import express from "express";
import cors from "cors";
import helmet from "helmet";

import { port } from "./config";
import { RouterPlayers } from "./routes/player";
import { RouterTeams } from "./routes/team";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/players", RouterPlayers);
app.use('/api/v1/team', RouterTeams)

app.listen(port, () => {
  console.log(`Listening in https://localhost:${port}`);
});
