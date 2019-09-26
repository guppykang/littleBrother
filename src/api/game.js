import axios from 'axios';

export async function getWords() {
  const response = await axios.get('http://localhost:3000/api/getWords.js');
  return response.data;

}
