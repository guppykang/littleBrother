const roomFunction = require('../models/room.js');


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let Room; 

  //get Room model
  try {
    Room = await roomFunction();
  }
  catch(err) {
    return res.send(err);
  }



  let roomExists = true;
  while(roomExists) {
    //get new room code
    newRoomCode = makeid(5);

    //check to see if the room exists
    roomExists = await Room.exists({ roomCode : newRoomCode });

    //don't forget to delete this room after the game is over
    let uploadResponse; 
    if(!roomExists) {
      try {
        uploadResponse = await Room.create({ roomCode : newRoomCode}); 

        res.json({ code : newRoomCode, exists : roomExists, uploaded : uploadResponse });
      }
      catch(err) {
        return next(err);
      }
    }
  }



}
