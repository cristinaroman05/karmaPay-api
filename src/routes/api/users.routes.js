const login = require('../../controllers/login.controller');
const register = require('../../controllers/register.controller');
const { getAll, getById, getByName, create, updateOne, deleteOne, getByMail } = require('../../controllers/users.controller');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:userId', getById)
router.get('/name/:userName', getByName)
router.get('/mail/:mail', getByMail)

router.post('/create', create)
router.post('/login', login)
router.post('/register', register)
router.put('/', updateOne)
router.delete('/:userId', deleteOne)


module.exports = router