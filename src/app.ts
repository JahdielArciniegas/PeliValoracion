import express from "express";
import userRoutes from "./modules/user/user.routes.js";
import coupleRoutes from "./modules/couple/couple.routes.js";
import swaggerUi from "swagger-ui-express";
import coupleMovieRouter from "./modules/coupleMovie/coupleMovie.routes.js";
import movieRouter from "./modules/movie/movie.routes.js";
import errorHandler from "./shared/middleware/errorHandler.js";
import verifyToken from "./shared/middleware/verifyToken.js";
import viewsRoutes from "./view/views.routes.js";
import cookieParser from "cookie-parser";
import path from "node:path";
// import rateLimiter from "./shared/middleware/rateLimiting.js";
import authRoutes from "./modules/auth/auth.routes.js";
const { default: swaggerDocument } = await import("./shared/swagger/swagger.json", {
    with: {
        type: "json",
    },
});

const options = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ]
};
const app = express();
// app.use(rateLimiter);
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/view"));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(verifyToken);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/couple", coupleRoutes);
app.use("/api/coupleMovie", coupleMovieRouter);
app.use("/api/movie", movieRouter);
app.use("/", viewsRoutes);
app.use(errorHandler);

export default app;
