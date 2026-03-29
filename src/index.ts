import { getConnection } from "./shared/db/connectionMongoDB.js";
import app from "./app.js";
await getConnection();

app.listen(3003, () => {
  console.log("Aplicación inicializada en http://localhost:3003");
});
