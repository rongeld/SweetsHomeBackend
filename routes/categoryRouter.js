const express = require('express');
const {
  getAllCategories,
  createCategory,
  getCategoriesNames,
  getCategory
} = require('../controllers/categoryController');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.route('/names').get(getCategoriesNames);

router.route('/shop/:category').get(getCategory);

router
  .route('/')
  .get(getAllCategories)
  .post(fileUpload.single('photo'), createCategory);

module.exports = router;
