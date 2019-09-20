const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const oldRoomCode = req.query["code"]; 

  try {
    let response = await Room.remove({ roomCode: oldRoomCode });
    return res.send(response);
  }
  catch (err) {
      return res.send(err);
  }

  
  
}
