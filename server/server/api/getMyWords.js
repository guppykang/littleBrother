const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const code = req.query["code"];
  const team = req.query["team"];

  if (team == 1) {
    let wordsQuery = await Room.find({ roomCode : code });
    let words = wordsQuery[0].teamOneWords;
    return res.send(words);
  }
  else if (team == 2) {
    let wordsQuery = await Room.find({ roomCode : code });
    let words = wordsQuery[0].teamTwoWords;
    return res.send(words);
  }

  return res.send(false);
}
