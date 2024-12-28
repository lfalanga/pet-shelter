import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSdoc from "swagger-jsdoc";

import petRoutes from "./pets/routes/pets.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// swagger definition
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "pet-shelter",
      version: "1.0.0",
    },
    servers: [
      {
        url: `/`,
      },
    ],
  },
  apis: ["./pets/routes/*.js"],
};

/* Global middlewares */
app.use(cors());
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSdoc(swaggerSpec))
);

/* Routes */
app.use("/pets", petRoutes);

/* Server setup */
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () =>
    console.log(`⚡️[server]: Server is running at ${process.env.APP_URL}:${port}`)
  );
}

export default app;
