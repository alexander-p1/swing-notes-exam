import express from "express";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swing notes API",
      version: "1.0.0",
      description:
        "NoteAPI for crud-operations, authentication and documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js*"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
