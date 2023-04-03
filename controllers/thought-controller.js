const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    await User.findByIdAndUpdate(
      thought.userId,
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );

    res.json({ message: "Thought deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: "No thought found with this id!" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
