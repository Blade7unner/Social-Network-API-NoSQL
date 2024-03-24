const router = require('express').Router();
const {
  addReaction,
  deleteReaction
} = require('../controllers/reaction-controller');

// Define routes
router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
