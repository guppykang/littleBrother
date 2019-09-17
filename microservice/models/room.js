const mongooseFunction = require('../mongoose_connections');

module.exports = async (req, res) => {
  const mongoose = await mongooseFunction();

  const roomScheme = new mongoose.Schema({
    roomCode: String  
  })
  
  const room = mongoose.model("Room", roomScheme);
  return date;

}
