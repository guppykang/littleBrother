const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  await connectToDatabase();

  let addResponse;


  console.log(req.body);
  return res.send(true);
  if (team == 1) {
    addResponse = await Room.update({ roomCode : code }, { teamOneWords : words });
  }
  else if (team == 2) {
    addResponse = await Room.update({ roomCode : code }, { teamTwoWords : words });
  }

  res.send(addResponse);

};
