const Room = require('../models/room');

exports.index = async (req, res) => {
  console.log('inside join room')
  res.setHeader('Access-Control-Allow-Origin', '*');

  const code = req.query["code"];
  const username = req.query["username"];

  try {
    let returnPayload = {
      codeExists: false,
      usernameExists: false,
      players: [],
      teamOne: [],
      teamTwo: []
    };

    let exists = await Room.exists({ roomCode: code });

    returnPayload.codeExists = exists;

    if (exists) {
      let usernameExists = await Room.exists({ roomCode: code, players: username });

      returnPayload.usernameExists = usernameExists;

      let currentPlayers;

      if (!usernameExists) {
        let response = await Room.update({ roomCode: code }, { $push: { players: username } });
        let doc = await Room.find({ roomCode: code });

        returnPayload.players = doc[0].players;
        returnPayload.teamOne = doc[0].teamOne;
        returnPayload.teamTwo = doc[0].teamTwo;
      }

      return res.json(returnPayload);
    }
    else {
      return res.json(returnPayload);
    }
  }
  catch (err) {
    console.log(err);
    return res.send(err);
  }
}

