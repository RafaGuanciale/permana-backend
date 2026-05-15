const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const perfumesRouter = require('./routes/perfumes');
const collectionRouter = require('./routes/collection');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/perfumes', perfumesRouter);
app.use('/collection', collectionRouter);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Ocorreu um erro no servidor');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
