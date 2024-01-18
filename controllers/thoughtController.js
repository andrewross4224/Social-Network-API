const { Thought, User } = require('../models');
const { $where } = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought } },
                { new: true }
            ).select('-__v');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getById(req, res) {
        try {
            const thought = await Thought.find({ _id: req.params.id }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async updateById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            ).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async deleteById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { reactions: req.body } },
            ).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { _id: req.params.reactionId } } },
            ).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No Reaction with that ID' });
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}