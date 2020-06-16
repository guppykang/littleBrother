const dateFunction = require('../models/date');

module.exports = async (req, res, next) => {
  const Date = await dateFunction();

  let query;

  try {
    query = await Date.find({ current: "September 3rd 2019, 6:32:31 pm" });
  }
  catch (err) {
    return next(err);
  }
  res.send(query);

} 
