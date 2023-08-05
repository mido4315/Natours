const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: [true, 'the tour name is already taken'],
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

/*
const testTour = new Tour({
  name: 'new tour test 2',
  rating: 4.7,
  price: 324,
});

testTour
  .save()
  .then((res) => console.log(`${res} successfully saved`))
  .catch((err) => console.log(`${err} error happened`));
*/
