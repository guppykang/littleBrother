import { model, Schema } from 'mongoose';

const wordsSchema = new Schema({
  words : [String]
});

const Words = model("Word", wordsSchema); 

export default Words;
