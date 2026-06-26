require("dotenv").config();
const express = require("express");
require("./config/db");
const cors = require("cors");

const app = express();
const { PORT = 3000 } = process.env;
const errorHandler = require("./middleware/errorHandler");
const { requestLogger, errorLogger } = require("./middleware/logger");
const usersRouter = require("./routes/users");

const perfumesRouter = require("./routes/perfumes");

const collectionRouter = require("./routes/collection");

const authRouter = require("./routes/auth");

const weatherRouter = require("./routes/weather");

app.use(
  cors({
    origin: ["http://localhost:3001", "https://permana-frontend.vercel.app"],
  }),
);
app.use(express.json());

app.use(requestLogger);

app.use("/users", usersRouter);
app.use("/perfumes", perfumesRouter);
app.use("/collection", collectionRouter);
app.use("/auth", authRouter);
app.use("/weather", weatherRouter);

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
