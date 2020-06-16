const Room = require('../models/room');

exports.index = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log('setting game start to true')

  let addResponse = null;

  const code = req.query["code"]


  addResponse = await Room.update({ roomCode: code }, { startGame: true });

  return res.send(true);

};
