const express = require('express');

const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  topCheapest,
  getTourStatus,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);
router.route('/').get(getAllTours).post(createTour);

router.route('/stats').get(getTourStatus);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/top-cheapest').get(topCheapest, getAllTours);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
