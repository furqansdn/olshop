import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product Name is Required'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 1000,
    },
    images: {
      type: String,
      required: [true, 'Image is Required'],
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
