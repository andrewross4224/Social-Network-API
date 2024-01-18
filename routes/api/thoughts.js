const router = require('express').Router();

const {
    getThoughts,
    addThought,
    getById,
    updateById,
    deleteById,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(addThought);
router.route('/:id').get(getById).put(updateById).delete(deleteById);
router.route('/:id/reactions/').post(addReaction);
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
