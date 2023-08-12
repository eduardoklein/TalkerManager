const express = require('express');
const { readTalker, findTalkerById, tokenSender } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } if (email.includes('@') && email.includes('.com') && email.indexOf('@') > 0) {
    return next();
  }
  return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length > 5) {
    return next();
}
  console.log(password.length);
  return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

app.get('/talker', async (req, res) => {
  const responseData = await readTalker();
  return res.status(200).json(responseData);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const foundTalker = await findTalkerById(Number(id));

  if (foundTalker === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(foundTalker);
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const token = await tokenSender(email, password);
  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
