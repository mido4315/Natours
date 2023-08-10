const express = require('express');

const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  topCheapest,
  getTourStatus,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);
router.route('/').get(getAllTours).post(createTour);

router.route('/stats').get(getTourStatus);

router.route('/top-cheapest').get(topCheapest, getAllTours);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
