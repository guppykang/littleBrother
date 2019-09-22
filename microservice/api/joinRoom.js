const { Room } = require('../models');
const connectToDatabase = require('../mongoose_connections');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  const code = req.query["code"];
  const username = req.query["username"];

  try {
    let returnPayload = {
      codeExists : false, 
      usernameExists : false
    };

    let exists = await Room.exists({ roomCode : code }); 
    
    returnPayload.codeExists = exists;

    if(exists) {
      let usernameExists = await Room.exists({ roomCode : code, players : username });

      returnPayload.usernameExists = usernameExists;
      if (!usernameExists) {
        let response = await Room.findOneAndUpdate({ roomCode : code }, { $push: { players : username } });
      }

      return res.json(returnPayload);
    }
    else {
        return res.json(returnPayload);
    }
  }
  catch (err) {
    console.log(err);
    return res.send(err);   
  }
}
 
