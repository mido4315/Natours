const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
// read tours from file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   // if (val > tours.length)
//   //   return res.status(404).json({
//   //     status: 'fail',
//   //     message: 'Invalid id',
//   //   });

//   next();
// };

// exports.checkTourBody = function (req, res, next) {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'bad request',
//       message: 'body does not contain name and price',
//     });
//   }

//   next();
// };

exports.topCheapest = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// EXPORTS THE FUNCTION TO GET ALL TOURS
exports.getAllTours = async (req, res) => {
  try {
    const apiFeatures = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    // Execute the final query to get all tours
    const tours = await apiFeatures.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    // IN CASE OF AN ERROR
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.getTourById = async (req, res) => {
  // exports.tour = tours[req.params.id];
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.getTourStatus = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $group: {
          _id: '$difficulty',
          num: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },

      {
        $sort: {
          avgPrice: -1,
        },
      },

      // {
      //   $match: {
      //     _id: { $ne: 'easy' },
      //   },
      // },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    res.status(200).json({
      status: 'success',
      length: plan.length,
      data: {
        plan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};
