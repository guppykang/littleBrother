import { Room } from  '../models';
import connectToDatabase from '../mongoose_connections';

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

  await connectToDatabase();

  let newRoomCode; 
  let roomExists = true;
  while(roomExists) {
    //get new room code
    newRoomCode = makeid(5);

    //check to see if the room exists
    roomExists = await Room.exists({ roomCode : newRoomCode, active : true });

    console.log(roomExists);
    //don't forget to delete this room after the game is over
    let uploadResponse; 
    if(!roomExists) {
      try {
        console.log('creating the new room');
        uploadResponse = await Room.updateOne({ roomCode : newRoomCode } , { active : true }, { upsert: true } ); 

        res.json({ code : newRoomCode, exists : roomExists, uploaded : uploadResponse });
      }
      catch(err) {
        return next(err);
      }
    }
  }



}
