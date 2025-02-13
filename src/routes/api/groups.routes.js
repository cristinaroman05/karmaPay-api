const { getAll, getById, getByName, create, updateOne, deleteOne } = require('../../controllers/groups.controller');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:groupId', getById)
router.get('/name/:groupName', getByName)

router.post('/create', create)
router.put('/:groupId', updateOne)
router.delete('/:groupId', deleteOne)


module.exports = router