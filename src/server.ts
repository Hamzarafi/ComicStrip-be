import express, { Request, Response } from "express";
import cors from "cors";
import comicRoutes from "./routes/comicRoutes";
import { configDotenv } from "dotenv";
import { createDatabase } from "./db/database";

configDotenv();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use("/api/comics", comicRoutes);

createDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
