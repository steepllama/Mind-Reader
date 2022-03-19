const router = require ('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    newUser,
    deleteUser,
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .put(newUser)
    .get(getUserById)
    .delete(deleteUser)

    module.exports = router;