import axios from 'axios';

export async function getNewRoomCode(code, username) {
  //const response = await axios.get('https://titanx.guppykang.now.sh/api/newRoom.js');

  const response = await axios.get(`http://localhost:3000/api/newRoom.js?code=${code}&username=${username}`);
  console.log('full response from backend: ' + JSON.stringify(response));
  return response.data;
}
