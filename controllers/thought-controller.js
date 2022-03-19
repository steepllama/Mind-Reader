const { Thought, User } = require('../models');

// get all thoughts
const ThoughtController = {
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get thought by id
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
        .populate({
            path: 'users', 
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create new thoughts
    newThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Nothing was found with this ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // New Reactions
    newReply({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({
                    message: 'Nothing was found with this ID!'
                });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }, 

    // Delete Reactions
    deleteReply({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }, 

    // update my thought
    renewThought({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then((renewThought) => {
            if (!renewThought) {
                return res.status(404).json({
                    message: 'Nothing was found with this ID'
                });
            }
            res.json(renewThought);
        })
        .catch(err => res.json(err));
    },

    // Delete a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
        .then((deleteThought) => {
            if (!deleteThought) {
                return res.status(404).json({
                    message: 'Nothing was found with this ID!'
                });
            }
            res.json(deleteThought);
        })
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;