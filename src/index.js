const express = require('express');
const { readTalker, 
  findTalkerById, 
  tokenSender, 
  addTalker } = require('./utils/fsUtils');
const { 
  validateEmail, 
  validatePassword,   
  validateToken,
  validateNameOnPost,
  validateAgeOnPost,
  validateTalkOnPost,
  validateWatchedAtOnPost,
  validateDateFormat,
  validateRateOnPost,
  validateRateValueOnPost } = require('./utils/verificationMiddleware');

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

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const token = await tokenSender(email, password);
  res.header('Authorization', `Bearer ${token}`);
  return res.status(200).json({ token });
});

app.post('/talker',
validateToken,
validateNameOnPost,
validateAgeOnPost,
validateTalkOnPost,
validateWatchedAtOnPost,
validateDateFormat,
validateRateOnPost,
validateRateValueOnPost, async (req, res) => {
  const talkerInfo = req.body;
  const returnTalker = await addTalker(talkerInfo);
  return res.status(201).json(returnTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
