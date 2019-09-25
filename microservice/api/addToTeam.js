const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();


  const team = req.query["team"];
  const username = req.query["username"];
  const code = req.query["code"];

  try {
    if (team == 1) {
      let deleteResponseOne = await Room.update({ roomCode : code, }, { $pull : { teamTwo : username } });
      let deleteResponseTwo = await Room.update({ roomCode : code, }, { $pull : { teamOne : username } });

      let addResponse = await Room.update({ roomCode : code }, { $push : { teamOne : username } });
    }
    else if (team == 2) {
      let deleteResponseOne = await Room.update({ roomCode : code, }, { $pull : { teamOne : username } });
      let deleteResponseTwo = await Room.update({ roomCode : code, }, { $pull : { teamTwo : username } });

      let addResponse = await Room.update({ roomCode : code }, { $push : { teamTwo : username } });
    }
    res.send(true);
  }
  catch (err) {
    console.log(err);
    res.send(err); 
  }

  
}
