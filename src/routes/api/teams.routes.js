const { getAll, getById, getByName, create, updateOne, deleteOne } = require('../../controllers/teams.controller');
const { checkOwner } = require('../../middlewares/users.middleware');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:teamId', getById)
router.get('/name/:teamName', getByName)

router.post('/create', create)
router.put('/:teamId', checkOwner, updateOne)
router.delete('/:teamId', deleteOne)


module.exports = router