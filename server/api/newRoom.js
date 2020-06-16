const Room = require('../models/room');

exports.index = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const newRoomCode = req.query["code"];
  const username = req.query["username"];

  let roomExists = true;

  let exists = await Room.exists({ roomCode: newRoomCode });
  if (exists) {
    console.log('room code exists');
    return res.send(false);
  }

  //don't forget to delete this room after the game is over
  let uploadResponse;
  try {
    console.log('creating the new room')
    uploadResponse = await Room.create({ roomCode: newRoomCode, players: [username], startGame: false, teamOneGoodPoints: 0, teamOneBadPoints: 0, teamTwoGoodPoints: 0, teamTwoBadPoints: 0 });
    res.send(true);
  }
  catch (err) {
    return res.json(err);
  }
}
