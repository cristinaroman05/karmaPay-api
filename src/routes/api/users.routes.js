const { getAll, getById, getByName, create, updateOne, deleteOne } = require('../../controllers/users.controller');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:userId', getById)
router.get('/name/:userName', getByName)

router.post('/create', create)
router.put('/:userId', updateOne)
router.delete('/:userId', deleteOne)


module.exports = router