const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const code = req.query["code"];

  let doc = await Room.find({ roomCode : code });


  if (doc) {
    return res.json(doc[0].startGame);
  }
  else {
    return false
  }

}
