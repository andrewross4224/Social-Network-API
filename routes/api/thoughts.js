const router = require('express').Router();

const {
    getUsers,
    addUser,
    getById,
    updateById,
    deleteById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(addUser);
router.route('/:id').get(getById).put(updateById).delete(deleteById);
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
