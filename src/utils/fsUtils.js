const fs = require('fs').promises;
const path = require('path');
const tokenGenerator = require('./tokenFunction');

async function readTalker() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const dataParsed = JSON.parse(data);
    return dataParsed;
  } catch (error) {
    console.error(`Erro na leitura: ${error}`);
  }
}

async function findTalkerById(id) {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const dataParsed = JSON.parse(data);
  const talker = dataParsed.find((element) => element.id === id);
  return talker;
}

async function tokenSender(__email, __password) {
  const token = tokenGenerator();
  return token;
}

async function addTalker(newTalker) {
  const oldTalkers = await readTalker();
  const newTalkerWithId = { ...newTalker, id: oldTalkers.length + 1 };
  const newTalkers = JSON.stringify([...oldTalkers, newTalkerWithId]);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), newTalkers);
  return newTalkerWithId;
}

module.exports = {
    readTalker,
    findTalkerById,
    tokenSender,
    addTalker,
};