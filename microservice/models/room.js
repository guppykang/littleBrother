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
  teamOneGoodPoints : Number, 
  teamOneBadPoints : Number, 
  teamTwoBadPoints : Number, 
  teamTwoGoodPoints : Number
})
  
const Room = model("Room", roomScheme);

export default Room;
