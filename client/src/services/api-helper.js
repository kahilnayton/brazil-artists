import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const getCharacters = async () => {
  const resp = await api.get('/characters');
  console.log(resp.data);
  return resp.data;
}

export const getCharacter = async (id) => {
  const resp = await api.get(`/characters/${id}`);
  console.log(resp.data);
  return resp.data;
}

export const postCharacter = async (characterData) => {
  const resp = await api.post('/characters', characterData);
  return resp.data;
}

export const putCharacter = async (id, characterData) => {
  const resp = await api.put(`/characters/${id}`, characterData);
  return resp.data;
}

export const deleteCharacter = async (id) => {
  const resp = await api.delete(`/characters/${id}`);
  return resp.data;
}