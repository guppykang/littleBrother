import { model, Schema } from 'mongoose';

const roomScheme = new Schema({
  roomCode: String, 
  players: [String], 
  teamOne : [String], 
  teamTwo : [String]
})
  
const Room = model("Room", roomScheme);

export default Room;
