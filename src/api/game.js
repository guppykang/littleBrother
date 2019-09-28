import axios from 'axios';

export async function getWords() {
  const response = await axios.get('http://localhost:3000/api/getWords.js');
  return response.data;
};

export async function saveWords(team, code, words) {
  const payload = {
    words, 
    team : team, 
    code : code
  }
  const response = await axios.post(`http://localhost:3000/api/saveWords.js`, payload);

  return response.data;
};

export async function getMyWords(team, code) {
    const response = await axios.get(`http://localhost:3000/api/getMyWords.js?team=${team}&code=${code}`);
    
  return response.data;
};

