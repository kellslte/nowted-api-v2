import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import expressListRoutes from "express-list-routes";
import {
  authRouter,
  folderRouter,
  notesRouter,
} from "../routes/index.routes.js";
import { createServer } from "http";
import { NotFoundError } from "../lib/utils/errorDefinitions.util.js";
import ErrorMiddleware from "../app/middleware/error.middleware.js";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Define application routes
// create a health route
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Application is up and running",
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/folders", folderRouter);
app.use("*", (req, res) => {
  throw new NotFoundError(
    `The route you requested does not exist on this server`
  );
});

app.use(ErrorMiddleware);
expressListRoutes(app);

export { app, server };
