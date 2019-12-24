import { model, Schema } from 'mongoose';

const roomScheme = new Schema({
  roomCode: String, 
  players: [String], 
  teamOne : [String], 
  teamTwo : [String], 
  teamOneWords : [String], 
  teamTwoWords : [String], 
  teamOneCode : [Number], 
  teamTwoCode : [Number], 
  startGame : Boolean, 
  turn : Number
})
  
const Room = model("Room", roomScheme);

export default Room;
