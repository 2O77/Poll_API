import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Question = mongoose.model('Question', questionSchema);
