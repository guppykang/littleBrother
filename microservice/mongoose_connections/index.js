const url = require('url');
const mongoose = require('mongoose');

let cacheDb = null;

module.exports = async () => {
  if (cacheDb) {
      return cacheDb;
  }
  
  cacheDb = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

  return cacheDb;


};


