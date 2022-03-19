const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    newThought,
    newReply,
    deleteReply,
    renewThought,
    removeThought

} = require('../../controllers/thought-controller');

router.route('/').get(getAllThought).post(newThought);

router
    .route('/:id')
    .get(getThoughtById)
