const router = require('express').Router();

// Define routes
router.route('/:thoughtId/reactions')
  .post((req, res) => {
    // Implement logic for adding a reaction
  })
  .delete((req, res) => {
    // Implement logic for deleting a reaction
  });

module.exports = router;
