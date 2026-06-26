const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATION_ERROR = 409;

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'DocumentNotFoundError') {
    return res
      .status(NOT_FOUND)
      .json({ message: `${err.entity} não encontrado` });
  }
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST).json({ message: 'Dados inválidos' });
  }
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).json({ message: 'ID inválido' });
  }
  if (err.name === 'SyntaxError') {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Campos obrigatórios faltando' });
  }
  if (err.code === 11000) {
    return res.status(DUPLICATION_ERROR).send({ message: 'Este e-mail já está cadastrado' });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ message: 'Ocorreu um erro no servidor' });
};
