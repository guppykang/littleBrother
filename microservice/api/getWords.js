const { Words } = require('../models');
const connectToDatabase = require('../mongoose_connections');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  await connectToDatabase();

  let wordsResponse = await Words.findById('5d8c23bc62a22a0ca32c7796'); 

  let words = wordsResponse.words;

  let randomIndexOne = getRandomInt(0, words.length - 1);
  let wordOne = words[randomIndexOne];
  let removeOne = words.splice(randomIndexOne, 1);

  let randomIndexTwo = getRandomInt(0, words.length -1);
  let wordTwo = words[randomIndexTwo];
  let removeTwo = words.splice(randomIndexTwo, 1);

  let randomIndexThree = getRandomInt(0, words.length - 1);
  let wordThree = words[randomIndexThree];
  let removeThree = words.splice(randomIndexThree, 1);

  let randomIndexFour = getRandomInt(0, words.length - 1);
  let wordFour = words[randomIndexFour];
  let removeFour = words.splice(randomIndexFour, 1);
  
  let randomWords = {
    first : wordOne, 
    second : wordTwo, 
    third : wordThree, 
    fourth : wordFour
  }

  res.json(randomWords);
};
