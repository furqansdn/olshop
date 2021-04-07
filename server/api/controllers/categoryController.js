import Category from '../../models/Category.js';
import { HTTPNotFound } from '../../utils/AppError.js';

export const getAll = async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({
    status: 'success',
    data: {
      categories,
    },
  });
};
export const getOne = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
};

export const create = async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { category },
  });
};

export const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new HTTPNotFound(`Category Not Found`);
  }

  res.status(200).json({
    status: 'success',
    data: { category },
  });
};

export const deleteOne = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new HTTPNotFound(`No category found with that id: ${req.params.id}`);
  }

  res.status(200).json({ status: 'success', data: null });
};
