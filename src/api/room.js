import axios from 'axios';

export async function getNewRoomCode(code, username) {
  const response = await axios.get(`http://localhost:3000/api/newRoom.js?code=${code}&username=${username}`);
  return response.data;
};

export async function deleteRoomCode(code) {
  const response = await axios.get(`http://localhost:3000/api/deleteRoom.js?code=${code}`);
  return response.data;
}; 

export async function joinRoom(code, username) {
   const response = await axios.get(`http://localhost:3000/api/joinRoom.js?code=${code}&username=${username}`); 
  return response.data;
};

export async function joinTeam(code, team, username) {
  const response = await axios.get(`http://localhost:3000/api/addToTeam.js?code=${code}&team=${team}&username=${username}`);
  return response.data;
}
