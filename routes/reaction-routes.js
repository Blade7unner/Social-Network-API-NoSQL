const router = require('express').Router();
const { Thought } = require('../models/thought'); 

router.route('/:thoughtId/reactions')
  .post(async (req, res) => {
    try {
      
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      
      
      thought.reactions.push(req.body);
      
      
      const updatedThought = await thought.save();
      
      
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
  .delete(async (req, res) => {
    try {
      
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
      
      
      const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId === req.body.reactionId);
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'No reaction found with this id' });
      }
      
      
      thought.reactions.splice(reactionIndex, 1);
      
      
      const updatedThought = await thought.save();
      
     
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
