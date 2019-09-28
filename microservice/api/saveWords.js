const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method == 'OPTIONS') {
    return res.send(true);
  }

  await connectToDatabase();
  console.log(req.body);

  let addResponse = null;

  let dict = [];
  dict.push(req.body.words.first);
  dict.push(req.body.words.second);
  dict.push(req.body.words.third);
  dict.push(req.body.words.fourth);

  console.log(dict);

  if (req.body.team == 1) {
    console.log('team one');
    addResponse = await Room.update({ roomCode : req.body.code }, { teamOneWords : dict});
  }
  else if (req.body.team == 2) {
    console.log('team two');
    addResponse = await Room.update({ roomCode : req.body.code }, { teamTwoWords : dict});
  }

  return res.send(true);

};
