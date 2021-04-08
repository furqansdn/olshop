import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product Name is Required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product Category is Required'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 1000,
    },
    image: {
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
