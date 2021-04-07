import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
