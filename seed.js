const { Character } = require('./models');
const { data } = require('./data');

const genCharacters = async () => {
  try {
    const characters = await Character.bulkCreate(data);
    
    console.log(`${characters.length} characters created`);
  } catch (e) {
    console.log('oopsie: ', e);
  }
}

const main = async () => {
  await genCharacters();
  process.exit();
}

main();
