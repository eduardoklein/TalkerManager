const fs = require('fs').promises;
const path = require('path');

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

module.exports = {
    readTalker,
    findTalkerById,
};