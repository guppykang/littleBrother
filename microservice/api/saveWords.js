const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const code = req.query["code"];
  const team = req.query["team"];

  let addResponse;

  const words = req.body.words;

  console.log(words);
  if (team == 1) {
    addResponse = await Room.update({ roomCode : code }, { teamOneWords : words });
  }
  else if (team == 2) {
    addResponse = await Room.update({ roomCode : code }, { teamTwoWords : words });
  }

  res.send(addResponse);

};
