const express = require('express');
const { readTalker, 
  findTalkerById, 
  tokenSender, 
  addTalker,
  editTalker,
  deleteTalker,
  search,
  patch } = require('./utils/fsUtils');
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
  validateRateValueOnPost,
  validateRateValueOnGet,
  validateRateOnPatch,
  validateRateValueOnPatch } = require('./utils/verificationMiddleware');

  const connection = require('./db/connection'); 

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker/db', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM talkers');
  console.log(rows);
  const talkers = rows.map((row) => ({
    name: row.name,
    age: row.age,
    id: row.id,
    talk: {
      watchedAt: row.talk_watched_at,
      rate: row.talk_rate,
    },
  }));
  if (!rows) {
    res.status(200).json([]);
  }
  res.status(200).json(talkers);
});

app.get('/talker/search', validateToken, validateRateValueOnGet, async (req, res) => {
  const nameSearch = req.query.q;
  const rateSearch = Number(req.query.rate);
  const result = await search(nameSearch, rateSearch);
  return res.status(200).json(result);
 });

 app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const foundTalker = await findTalkerById(Number(id));

  if (foundTalker === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(foundTalker);
});

app.get('/talker', async (req, res) => {
  const responseData = await readTalker();
  return res.status(200).json(responseData);
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

app.put('/talker/:id', validateToken, 
validateNameOnPost, 
validateAgeOnPost, 
validateTalkOnPost,
validateWatchedAtOnPost,
validateDateFormat,
validateRateOnPost,
validateRateValueOnPost,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerToEdit = await findTalkerById(id);
  if (!talkerToEdit) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkerToEdit.name = name;
  talkerToEdit.age = age;
  talkerToEdit.talk.watchedAt = talk.watchedAt;
  talkerToEdit.talk.rate = talk.rate;
  const talkerEdited = await editTalker(id, talkerToEdit);
  return res.status(200).json(talkerEdited);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.patch('/talker/rate/:id', 
validateToken, 
validateRateOnPatch, 
validateRateValueOnPatch, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  console.log(id, rate);
  await patch(id, rate);
  return res.status(204).json();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, async () => {
  console.log('Online');

  const [result] = await connection.execute('SELECT 1');
  if (result) {
    console.log('MySQL connection OK');
  }
});
