require("dotenv").config();
const express = require("express");
require("./config/db");
const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");

const perfumesRouter = require("./routes/perfumes");

const collectionRouter = require("./routes/collection");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);
app.use((req, res, next) => {
  req.user = {
    _id: "6a10a40774bd4f4141d0cf8d",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/perfumes", perfumesRouter);
app.use("/collection", collectionRouter);

app.use((req, res) => {
  res.status(404).send("Not found");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NOT_FOUND)
      .json({ message: `${err.entity} não encontrado` });
  }
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).json({ message: "Dados inválidos" });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).json({ message: "ID inválido" });
  }
  if (err.name === "SyntaxError") {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Campos obrigatórios faltando" });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ message: "Ocorreu um erro no servidor" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
