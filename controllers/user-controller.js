const { User } = require('../models');

// get all users
const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // only one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.thoughtId })
        .populate({
            path: 'users',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create new user 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // create new user
    newUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.thoughtId })
        .then(dbUserData => { 
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id exists! '});
                return
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;