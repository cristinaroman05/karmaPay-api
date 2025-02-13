// Example controller
const getAll = (req, res, next) => {
    res.send('getAll users');
}
const getById = (req, res, next) => {
    res.send('getById user');
}
const getByName = (req, res, next) => {
    res.send('getByName user');
}
const create = (req, res, next) => {
    res.send('create user');
}
const updateOne = (req, res, next) => {
    res.send('update user');
}
const deleteOne = (req, res, next) => {
    res.send('delete user');
}

module.exports = { getAll, getById, getByName, create, updateOne, deleteOne }