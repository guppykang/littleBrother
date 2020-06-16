const Room = require('../models/room');

exports.index = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const oldRoomCode = req.query["code"];

  try {
    let response = await Room.remove({ roomCode: oldRoomCode });
    return res.send(response);
  }
  catch (err) {
    return res.send(err);
  }
}
