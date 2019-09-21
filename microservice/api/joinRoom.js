const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const code = req.query["code"];
  const username = req.query["username"];

  try {
    let exists = await Room.exists({ roomCode : code }); 
    
    console.log(exists);
    
    if(exists) {
       let response = await Room.findOneAndUpdate({ roomCode : code }, { $push: { players : username } });
      return res.send(true);
    }
    else {
        return res.send(false);
    }
  }
  catch (err) {
    console.log(err);
    return res.send(false);   
  }
}
 
