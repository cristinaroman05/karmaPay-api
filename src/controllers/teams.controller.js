const Team = require('../models/team.model')


const getAll = async (req, res, next) => {
    try {
        const teams = await Team.selectAll()
        res.json(teams)
    } catch (error) {
        next(error)
    }
}
const getById = async (req, res, next) => {
    const { teamId } = req.params
    try {
        const team = await Team.selectById(teamId)
        if (!team) {
            res.status(404).json({ message: 'El id del grupo no existe' })
        }
        res.json(team)
    } catch (error) {
        next(error)
    }
}
const getByName = async (req, res, next) => {
    const { teamName } = req.params
    try {
        const team = await Team.selectByName(teamName)
        if (!team) {
            res.status(404).json({ message: 'El nombre del grupo no existe' })
        }
        res.json(team)
    } catch (error) {
        next(error)
    }
}
const getByCategory = async (req, res, next) => {
    const { category } = req.params
    try {
        const team = await Team.selectByCategory(category)
        if (!team) {
            res.status(404).json({ message: 'No existe ningún grupo en esa categoría' })
        }
        res.json(team)
    } catch (error) {
        next(error)
    }
}
const create = async (req, res, next) => {
    const ownerId = req.user.Id;
    try {
        const result = await Team.addTeam(req.body, ownerId);
        const newTeam = await Team.selectById(result.insertId);
        res.json(newTeam);
    } catch (error) {
        next(error);
    }
}
const updateOne = async (req, res, next) => {
    try {
        const { teamId } = req.params
        await Team.updateById(teamId, req.body)
        const teamUpdated = await Team.selectById(teamId)
        res.json({ message: 'grupo actualizado', teamUpdated })
    } catch (error) {
        next(error)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const { teamId } = req.params
        const teamDeleted = await Team.selectById(teamId)
        await Team.deleteById(teamId)
        res.json({ message: 'grupo eliminado', teamDeleted })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, getByName, getByCategory, create, updateOne, deleteOne }