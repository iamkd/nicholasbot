import { Schema } from 'mongoose';
import uuid from 'uuid';

export default new Schema({
  _id: { type: String, default: uuid.v4 },
  name: String,
  faculty: String,
  year: String,
  description: String,
  telegram: String,
  facebook: String,
  phoneNumber: String,
  message: String,
  telegramId: String,
  pairId: String,
  count: Number
});
