const { Room } = require('../models'); 
const connectToDatabase = require('../mongoose_connections');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFromList(list) {
  let index = getRandomInt(0, list.length-1);
  return list[index];
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const roomCode = req.query["code"];
  const team = req.query["team"];

  let numbers = [1,2,3,4];

  const first = getRandomFromList(numbers);
  numbers.splice(numbers.indexOf(first), 1);

  const second = getRandomFromList(numbers);
  numbers.splice(numbers.indexOf(second), 1);

  const third = getRandomFromList(numbers);

  const code = [first, second, third];

  if (team == 1) {
    let addCodeResponse = await Room.update({ roomCode : roomCode }, { teamOneCode : code });
    return res.send(code);
  }
  else if (team == 2) {
    let addCodeResponse = await Room.update({ roomCode : roomCode }, { teamTwoCode : code });
    return res.send(code);
  }

  res.send(false);
}
