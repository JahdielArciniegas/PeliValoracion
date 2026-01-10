import express from "express";
import authRoutes from "./routes/user.routes.js";
import coupleRoutes from "./routes/couple.routes.js";
import { getConnection } from "./db/connectionMongoDB.js";
import coupleMovieRouter from "./routes/coupleMovie.routes.js";
import movieRouter from "./routes/movie.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import verifyToken from "./middleware/verifyToken.js";

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/view");
app.use(verifyToken);
app.use("/api/user", authRoutes);
app.use("/api/couple", coupleRoutes);
app.use("/api/coupleMovie", coupleMovieRouter);
app.use("/api/movie", movieRouter);
app.use(errorHandler);
await getConnection();

app.listen(3003, () => {
  console.log("Aplicación inicializada en http://localhost:3003");
});
