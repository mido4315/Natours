const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    message: 'route not finished yet',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    message: 'route not finished yet',
  });
};
