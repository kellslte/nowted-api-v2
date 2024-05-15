import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import expressListRoutes from "express-list-routes";
import { appRouter } from "../routes/index.routes.js";
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

// create a health route
app.use("/api", appRouter);
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Application is up and running",
  });
});
app.use('*', (req, res) => {
    throw new NotFoundError(
      `The route you resuested, ${req.url} does not exist on this server`
    );
})

app.use(ErrorMiddleware);
expressListRoutes(app);

export {
    app, server
}