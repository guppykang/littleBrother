import axios from 'axios';

export async function getNewRoomCode(code, username) {
  const response = await axios.get(`http://localhost:5000/newRoom?code=${code}&username=${username}`);
  return response.data;
};

export async function deleteRoomCode(code) {
  const response = await axios.get(`http://localhost:5000/deleteRoom?code=${code}`);
  return response.data;
};

export async function joinRoom(code, username) {
  console.log('clicked join')
  const response = await axios.get(`http://localhost:5000/joinRoom?code=${code}&username=${username}`);
  return response.data;
};

export async function joinTeam(code, team, username) {
  const response = await axios.get(`http://localhost:5000/addToTeam?code=${code}&team=${team}&username=${username}`);
  return response.data;
}
