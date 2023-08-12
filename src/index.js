const express = require('express');
const { readTalker, findTalkerById, tokenSender } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

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

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = await tokenSender(email, password);
  console.log(token);
  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
