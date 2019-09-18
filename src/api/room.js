import axios from 'axios';

export async function getNewRoomCode() {
  const response = await axios.get('localhost:3000/api/newRoom.js');
  console.log(response);
  return response.data;
}
