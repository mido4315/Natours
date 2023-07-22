const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();
const PORT = 3000;

// middleware
app.use(morgan('dev'));
app.use(express.json());

// route handlers

// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTourById);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

// routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}....`);
});
