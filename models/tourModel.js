const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: [true, 'the tour name is already taken'],
  },
  duration: {
    type: String,
    required: [true, 'The tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'The tour must have a maximum group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'The tour must have a difficulty'],
  },
  ratingAvg: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select:false,
  },
  startDates: [Date],
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
