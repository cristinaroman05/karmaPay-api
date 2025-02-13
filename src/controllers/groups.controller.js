// Example controller
const getAll = (req, res, next) => {
    res.send('getAll groups');
}
const getById = (req, res, next) => {
    res.send('getById group');
}
const getByName = (req, res, next) => {
    res.send('getByName group');
}
const create = (req, res, next) => {
    res.send('create group');
}
const updateOne = (req, res, next) => {
    res.send('update group');
}
const deleteOne = (req, res, next) => {
    res.send('delete group');
}

module.exports = { getAll, getById, getByName, create, updateOne, deleteOne }