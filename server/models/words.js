const { model, Schema } = require('mongoose');

const wordsSchema = new Schema({
  words: [String]
});

const Words = model("Word", wordsSchema);

module.exports = Words;