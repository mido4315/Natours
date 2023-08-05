const Tour = require('../models/tourModel');

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

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
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
    res.status(400).json({
      status: 'fail',
      data: {
        message: error,
      },
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndRemove(req.params.id);
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
