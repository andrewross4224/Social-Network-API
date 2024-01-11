const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async getById(req, res) {
        try {
            const user = await User.find({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async updateById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async deleteById(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
            );
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
            );
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}