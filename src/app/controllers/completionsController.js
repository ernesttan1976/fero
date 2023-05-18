const Completion = require("../models/Completion");

const index = async (req, res) => {
    try {
      const foundCompletion = await Completion.find({});
      res.status(200).json(foundCompletion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const create = async (req, res) => {
  try {
    const createdCompletion = await Completion.create(req.body);
    res.status(201).json(createdCompletion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const seed = async (req, res) => {
  try {
    await Completion.deleteMany({});

    const seedCompletions = require('../database-seed/completions-seed.json'); 
    console.log(seedCompletions);

    const completions = await Exhibition.create(seedCompletions);
    res.status(200).json(completions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCompletion = async (req, res) => {
  try {
    const deletedCompletion = await Completion.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCompletion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const completion = await Completion.findById(req.params.id)
    //.populate("artworks");
    res.status(200).json(completion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedCompletion = await Completion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCompletion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  seed,
  index,
  delete: deleteCompletion,
  show,
  update,
};