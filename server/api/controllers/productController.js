import Product from '../../models/Product.js';
import { Upload } from '../../utils/cloudinary.js';
import { BadRequest, HTTPNotFound } from '../../utils/AppError.js';

export const create = async (req, res, next) => {
  if (!req.file) {
    throw new BadRequest('Image is required');
  }
  const { url } = await Upload(req.file.path);
  req.body.image = url;

  const product = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

export const update = async (req, res, next) => {
  if (req.file) {
    const { url } = await Upload(req.file.path);
    req.body.image = url;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new HTTPNotFound(`Product with id ${req.params.id} not found`);
  }

  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

export const getAll = async (req, res, next) => {
  let filter = {};
  if (req.query.categoryId) {
    filter['category'] = req.query.categoryId;
  }
  const products = await Product.find(filter).populate({
    path: 'category',
    select: 'title _id',
  });

  res.status(200).json({
    status: 'success',
    data: products,
  });
};

export const getOne = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new HTTPNotFound(`Product with id ${req.params.id} not found`);
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
};

export const deleteOne = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new HTTPNotFound(`Product with id ${req.params.id} not found`);
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
};
