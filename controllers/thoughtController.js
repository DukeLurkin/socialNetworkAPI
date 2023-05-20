const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require('../models');
module.exports = {

  //* Create a Thought and add to user - POST
  async createThought(req, res) {
    try {
      console.log(req.body);
      const dbUserData = await Thought.create(req.body)
      .then((thought) =>
    {
      // adding thought to user here, find user first then add via id
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    })
  }
      catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // * Get ALL Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
// *Get 1 thought by id
getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
// * Update thought by id
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
//* Delete thought
deleteThought(req, res) {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : User.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thought: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' })
        : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(err));
},
};