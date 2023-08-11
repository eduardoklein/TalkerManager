const fs = require('fs').promises;
const path = require('path');

async function readTalker() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const dataParsed = JSON.parse(data);
    console.log(dataParsed);
    return dataParsed;
  } catch (error) {
    console.error(`Erro na leitura: ${error}`);
  }
}

module.exports = {
    readTalker,
};