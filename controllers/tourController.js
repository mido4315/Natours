const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  exports.newId = tours[tours.length - 1].id + 1;
  exports.newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    '${__dirname}/dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTourById = (req, res) => {
  // exports.tour = tours[req.params.id];
  exports.id = parseInt(req.params.id);
  if (id <= tours.length) {
    exports.tour = tours.find((el) => el.id === id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
};

exports.updateTour = (req, res) => {
  if (req.params.id > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
