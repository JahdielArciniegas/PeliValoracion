import express from "express";
import authRoutes from "./routes/user.routes.js";
import coupleRoutes from "./routes/couple.routes.js";
import { getConnection } from "./db/connectionMongoDB.js";

const app = express();

app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/couple", coupleRoutes);

await getConnection();

app.listen(3003, () => {
  console.log("Aplicación inicializada en http://localhost:3003");
});
