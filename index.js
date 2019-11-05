const express = require('express');
const { Character } = require('./models');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/characters', async (req, res) => {
  const characters = await Character.findAll()
  res.json(characters)
})
app.get('/characters/:id', async (req, res) => {
  const id = req.params.id
  const character = await Character.findByPk(id)
  res.json(character)
})
app.put('/characters/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await Character.update(data, {
    where: { id }
  });
  const character = await Character.findByPk(id)
  res.json(character);
})
app.post('/characters', async (req, res) => {
  const data = req.body;
  console.log(JSON.stringify(data));
  const character = await Character.create(data);
  res.json(character);
})
app.delete('/characters/:id', async (req, res) => {
  const id = req.params.id
  const character = await Character.findByPk(id)
  await character.destroy()
  res.json(character)
})
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});