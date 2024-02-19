import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import authRoutes from "./routes/auth";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/", routes);
app.use("/auth", authRoutes);

export default app;
