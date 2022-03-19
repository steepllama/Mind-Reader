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
            res.sendStatus(400);
        });
    },

    // create new thought
    newThought({ params }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // Add Reply
    newReply({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (dbThoughtData) {
                    res.status(404).json({ message: 'Please add valid response!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }, 

    // edit reply
    editReply({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (dbThoughtData) { 
                    res.status(404).json({ message: 'Please add valid response!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete reply
    deleteReply({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => { 
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This message does not exist!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }, 

    // deleteThought({ params, body }, res) {
    //     Thought.findOneAndDelete({ _id: params.id })
    //     .then(dbThoughtData => {
    //         if (!ThoughtData) {
    //             return res.status(404).json({ message: 'This thought no longer exists!' });
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // }
};

module.exports = thoughtController;