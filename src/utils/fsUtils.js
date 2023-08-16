const fs = require('fs').promises;
const path = require('path');
const tokenGenerator = require('./tokenFunction');

const DATA_PATH = '../talker.json';

async function readTalker() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, DATA_PATH));
    const dataParsed = JSON.parse(data);
    return dataParsed;
  } catch (error) {
    console.error(`Erro na leitura: ${error}`);
  }
}

async function findTalkerById(id) {
  const data = await fs.readFile(path.resolve(__dirname, DATA_PATH));
  const dataParsed = JSON.parse(data);
  const talker = dataParsed.find((element) => element.id === Number(id));
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
  await fs.writeFile(path.resolve(__dirname, DATA_PATH), newTalkers);
  return newTalkerWithId;
}

async function editTalker(id, editedTalker) {
  const oldTalkers = await readTalker();
  const updatedTalker = { id, ...editedTalker };
  const editedTalkers = oldTalkers.map((currentTalker) => {
    if (currentTalker.id === updatedTalker.id) {
      return updatedTalker;
    }
    return currentTalker;
  });
  const updatedData = JSON.stringify(editedTalkers);
  await fs.writeFile(path.resolve(__dirname, DATA_PATH), updatedData);

  return updatedTalker;
}

async function deleteTalker(id) {
  const oldTalkers = await readTalker();
  const newTalkers = oldTalkers.filter((currentTalker) => currentTalker.id !== Number(id));
  const updatedData = JSON.stringify(newTalkers);
  await fs.writeFile(path.resolve(__dirname, DATA_PATH), updatedData);
}

module.exports = {
    readTalker,
    findTalkerById,
    tokenSender,
    addTalker,
    editTalker,
    deleteTalker,
};