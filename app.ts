import config from "./conf.js";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import pokemonRouter from "./entities/pokemon/router.js";
import userRouter from "./entities/user/router.js";

const app = express();
const mongooseConnection = mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

mongooseConnection
  .then(() => console.log("Todo OK"))
  .catch((err) => {
    console.log("No funciona", err);
  });

// const handlerError = () => {

// }

app.use(express.json());
app.use("/pokemon", pokemonRouter);
app.use("/user", userRouter);
// app.use(handlerError);

app.listen(config.PORT, () => console.log("Servidor levantado en 3000"));
