const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();
  console.log('setting game start to true')

  let addResponse = null;

  const code = req.query["code"]
  

  addResponse = await Room.update({ roomCode : code }, { startGame : true});

  return res.send(true);

};
