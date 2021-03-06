import axios from 'axios';

export async function getWords() {
  const response = await axios.get('http://localhost:5000/getWords');
  return response.data;
};

export async function saveWords(team, code, words) {
  const payload = {
    words,
    team: team,
    code: code
  }
  const response = await axios.post(`http://localhost:5000/saveWords`, payload);

  return response.data;
};

export async function getMyWords(team, code) {
  const response = await axios.get(`http://localhost:5000/getMyWords?team=${team}&code=${code}`);

  return response.data;
};

export async function getCode(team, code) {
  const response = await axios.post(`http://localhost:5000/getCode?team=${team}&code=${code}`);

  return response.data;
}

export async function setStartGame(code) {
  const response = await axios.post(`http://localhost:5000/setStartGame?code=${code}`);

  return response.data;
}

export async function getStartGame(code) {
  const response = await axios.post(`http://localhost:5000/getStartGame?code=${code}`);

  return response.data;
}

export async function scoreRound(code, team, answer, guess, sequence, score) {
  const payload = {
    answer: answer,
    guess: guess,
    sequence: sequence,
    score: score,
    team: team,
    code: code
  }
  const response = await axios.post(`http://localhost:5000/scoreRound`, payload);

  return response.data;
}

export async function saveNextHinter(code, team, index) {
  const payload = {
    code: code,
    team: team,
    index: index
  }

  const response = await axios.post(`http://localhost:5000/saveNextHinter`, payload);

  return response.data;
}

export async function getNextHinter(code, team) {
  const payload = {
    code: code,
    team: team,
  }

  const response = await axios.post(`http://localhost:5000/getNextHinter`, payload);

  return response.data;
}
