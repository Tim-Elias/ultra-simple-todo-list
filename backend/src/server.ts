import express, { Express, Request, Response, NextFunction } from "express";
import bodyParcer from "body-parser";
import dotenv from "dotenv";
import { taskRouter } from "./routes/tasks.router";
import  cors from "cors";
import { authRouter } from "./routes/auth.router";

dotenv.config({ path: __dirname + "/./../../.env" });

const app: Express = express();
const port = process.env.API_PORT;
app.use(cors({
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParcer.json());
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port);
