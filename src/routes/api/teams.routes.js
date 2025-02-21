const { getAll, getById, getByName, create, updateOne, deleteOne, getByCategory, createUserTeam } = require('../../controllers/teams.controller');


const router = require('express').Router();

router.get('/', getAll)
router.get('/:teamId', getById)
router.get('/name/:teamName', getByName)
router.get('/category/:category', getByCategory)

router.post('/create', create)
router.post('/create/createUserTeam', createUserTeam)
router.put('/:teamId', updateOne)
router.delete('/:teamId', deleteOne)


module.exports = router