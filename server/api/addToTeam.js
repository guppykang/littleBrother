const Room = require('../models/room');

exports.index = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const team = req.query["team"];
  const username = req.query["username"];
  const code = req.query["code"];

  try {
    if (team == 1) {
      let deleteResponseOne = await Room.update({ roomCode: code, }, { $pull: { teamTwo: username } });
      let deleteResponseTwo = await Room.update({ roomCode: code, }, { $pull: { teamOne: username } });

      let addResponse = await Room.update({ roomCode: code }, { $push: { teamOne: username } });
    }
    else if (team == 2) {
      let deleteResponseOne = await Room.update({ roomCode: code, }, { $pull: { teamOne: username } });
      let deleteResponseTwo = await Room.update({ roomCode: code, }, { $pull: { teamTwo: username } });

      let addResponse = await Room.update({ roomCode: code }, { $push: { teamTwo: username } });
    }
    res.send(true);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }


}
