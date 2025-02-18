const { getAll, getById, getByName, create, updateOne, deleteOne } = require('../../controllers/teams.controller');


const router = require('express').Router();

router.get('/', getAll)
router.get('/:teamId', getById)
router.get('/name/:teamName', getByName)

router.post('/create', create)
router.put('/:teamId', updateOne)
router.delete('/:teamId', deleteOne)


module.exports = router