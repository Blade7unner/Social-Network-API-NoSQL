const router = require('express').Router();
const { Thought } = require('../models/thought'); // Import the Thought model

// Define routes
router.route('/:thoughtId/reactions')
  .post(async (req, res) => {
    try {
      // Find the thought by its ID
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      
      // Add the reaction to the reactions array
      thought.reactions.push(req.body);
      
      // Save the updated thought
      const updatedThought = await thought.save();
      
      // Send the updated thought as the response
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
  .delete(async (req, res) => {
    try {
      // Find the thought by its ID
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      
      // Find the index of the reaction to delete
      const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId === req.body.reactionId);
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'No reaction found with this id' });
      }
      
      // Remove the reaction from the reactions array
      thought.reactions.splice(reactionIndex, 1);
      
      // Save the updated thought
      const updatedThought = await thought.save();
      
      // Send the updated thought as the response
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
