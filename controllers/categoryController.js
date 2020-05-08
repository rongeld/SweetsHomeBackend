const Category = require('../models/categoryModel');
// const APIfunctionality = require('../utils/APIfunctionality');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

const getAllCategories = catchAsync(async (req, res, next) => {
  const categoryData = await Category.find().populate('products');

  res.status(200).json({
    status: 'success',
    totalElements: categoryData.length,
    data: categoryData
  });
});

const getCategoriesNames = catchAsync(async (req, res, next) => {
  const categoryData = await Category.find().select('name photo');

  res.status(200).json({
    status: 'success',
    totalElements: categoryData.length,
    data: categoryData
  });
});
const getCategory = catchAsync(async (req, res, next) => {
  const name = req.params.category;
  const categoryData = await Category.findOne({ name })
    .populate('products')
    .select('products');

  res.status(200).json({
    status: 'success',
    totalElements: categoryData.length,
    data: categoryData
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.path.replace(/\\/g, '/');
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newCategory
  });
});

module.exports = {
  getAllCategories,
  createCategory,
  getCategoriesNames,
  getCategory
};
