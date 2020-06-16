const Room = require('../models/room');

exports.index = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const code = req.query["code"];

  let doc = await Room.find({ roomCode: code });


  if (doc) {
    return res.json(doc[0].startGame);
  }
  else {
    return false
  }

}
