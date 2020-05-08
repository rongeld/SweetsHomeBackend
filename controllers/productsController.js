const Sweet = require('../models/sweetModel');
const APIfunctionality = require('../utils/APIfunctionality');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// const { deleteOne, updateOne } = require('./handlerFactory');

// const topToursMiddleware = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,summary,difficulty,ratingsAverage';
//   next();
// };

const getSpecificCategorySweets = (req, res, next) => {
  req.query.category = req.params.category;
  next();
};

const getAllSweets = catchAsync(async (req, res, next) => {
  const sweetAPI = new APIfunctionality(Sweet.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();
  const sweets = await sweetAPI.query;

  res.status(200).json({
    status: 'success',
    totalElements: sweets.length,
    data: sweets
  });
});

const createSweet = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.path.replace(/\\/g, '/');
  req.body.name = req.body.name.toLowerCase();
  const newSweet = await Sweet.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newSweet
  });
});

// const updateTour = updateOne(Tour);
// const updateTour = catchAsync(async (req, res, next) => {
//   const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   if (!updatedTour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: updatedTour
//     }
//   });
// });

// const deleteTour = deleteOne(Tour);
// const deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(404).json({
//     status: 'success',
//     data: null
//   });
// });

const shopSweetsMiddleware = catchAsync(async (req, res, next) => {
  const stats = await Sweet.aggregate([
    {
      $match: {
        price: { $lte: 1000 }
      }
    },
    {
      $group: {
        _id: null,
        maxPrice: { $max: '$price' }
      }
    },
    {
      $match: { _id: { $ne: 'easy' } }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      tour: stats
    }
  });
});
// const getTourStats = catchAsync(async (req, res, next) => {
//   const stats = await Tour.aggregate([
//     {
//       $match: {
//         ratingsAverage: {
//           $gte: 4.5
//         }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         numTours: {
//           $sum: 1
//         },
//         avgRating: {
//           $avg: '$ratingsAverage'
//         },
//         avgPrice: {
//           $avg: '$price'
//         },
//         minPrice: {
//           $min: '$price'
//         },
//         maxPrice: {
//           $max: '$price'
//         }
//       }
//     },
//     {
//       $sort: {
//         avgPrice: 1
//       }
//     }
//     {
//      $match: { _id: { $ne: 'easy' } }
//     }
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: stats
//     }
//   });
// });

// const getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;
//   const plan = await Tour.aggregate([
//     {
//       $unwind: '$startDates'
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`)
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           $month: '$startDates'
//         },
//         numTourStarts: {
//           $sum: 1
//         },
//         tours: {
//           $push: '$name'
//         }
//       }
//     },
//     {
//       $addFields: {
//         month: '$_id'
//       }
//     },
//     {
//       $project: {
//         _id: 0 // hide filed if 0 and show if 1
//       }
//     },
//     {
//       $sort: {
//         numTourStarts: -1
//       }
//     }
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plan: plan
//     }
//   });
// });
module.exports = {
  getAllSweets,
  createSweet,
  getSpecificCategorySweets,
  shopSweetsMiddleware
  //   updateTour,
  //   deleteTour,
  //   topToursMiddleware,
  //   getTourStats,
  //   getMonthlyPlan
};
