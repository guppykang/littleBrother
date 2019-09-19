import { model, Schema } from 'mongoose';

const roomScheme = new Schema({
  roomCode: String,
  active : Boolean 
})
  
const Room = model("Room", roomScheme);

export default Room;
