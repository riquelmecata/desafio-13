import mongoose from "mongoose";
import env from "../../config/config.js";

const { userDb, passwordDb } = env;

mongoose
  .connect(`mongodb+srv://${userDb}:${passwordDb}@cluster0.cjinh2b.mongodb.net/ecommerce?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectarse a la base de datos:", error.message);
  });
