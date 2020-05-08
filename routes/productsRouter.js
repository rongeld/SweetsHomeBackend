const express = require('express');
const {
  getAllSweets,
  createSweet,
  getSpecificCategorySweets,
  shopSweetsMiddleware
} = require('../controllers/productsController');

const fileUpload = require('../middleware/file-upload');

// const { protect, restrictedTo } = require('../controllers/authController');
// const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router.use('/:tourId/reviews', reviewRouter);

router.route('/shop').get(shopSweetsMiddleware);

// router.route('/tour-stats').get(getTourStats);

// router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/:category').get(getSpecificCategorySweets, getAllSweets);

router
  .route('/')
  .get(getAllSweets)
  // .post(upload.single('photo'), createSweet);
  .post(fileUpload.single('photo'), createSweet);

// router
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(protect, restrictedTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
