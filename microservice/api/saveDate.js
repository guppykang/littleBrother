const moment = require('moment');
const dateFunction = require('../models/date.js');

module.exports = async (req, res, next) => {
  let Date; 

  try {
    Date = await dateFunction();
  }
  catch(err) {
      return next(err);
  }
 
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

  try {
    const uploadResponse = await Date.create({ current : currentTime });
  }
  catch(err) {
      return next(err);
  }

  res.json( { currentTime } );
}
