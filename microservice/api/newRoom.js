const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const newRoomCode = req.query["code"];
  const username = req.query["username"];

  let roomExists = true;
  
  let exists = await Room.exists({ roomCode : newRoomCode }); 
  if(exists) {
    return res.send(false);      
  }

  //don't forget to delete this room after the game is over
  let uploadResponse;
  try {
    console.log('creating the new room')
    uploadResponse = await Room.create({ roomCode : newRoomCode, players : [username], startGame : false});
    res.send(true);
  }
  catch(err) {
    return res.json(err);
  }
}
