import { getConnection } from "./shared/db/connectionMongoDB.js";
import app from "./app.js";
await getConnection();

app.listen(process.env.PORT || 3003, () => {
  console.log(`Aplicación inicializada en http://localhost:${process.env.PORT || 3003}`);
});

export default app;
