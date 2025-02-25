const Team = require('../models/team.model')
const Expense = require('../models/expense.model')
const User = require('../models/user.model')

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
        const expenses = await Expense.selectAllByUser(teamId)
        res.json({ team, expenses })
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

        res.json(team)
    } catch (error) {
        next(error)
    }
}
const create = async (req, res, next) => {
    const ownerId = req.user.Id;
    try {
        const result = await Team.addTeam(req.body, ownerId);
        await Team.addUserTeam(ownerId, result.insertId);
        const newTeam = await Team.selectById(result.insertId);
        res.json(newTeam);
    } catch (error) {
        next(error);
    }
}
const createUserTeam = async (req, res, next) => {
    const { userId, teamId } = req.body
    try {
        await Team.addUserTeam(userId, teamId);
        const userAdded = await User.selectAll(teamId)
        res.json(userAdded);
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
const getOwnerById = async (req, res, next) => {
    const { teamId } = req.params
    try {
        const Owner = await Team.getOwnerById(teamId)
        if (!Owner) {
            res.status(404).json({ message: 'El id del grupo no existe' })
        }
        res.json(Owner.Owner)
    } catch (error) {
        next(error)
    }
}
module.exports = { getAll, getById, getByName, getByCategory, create, createUserTeam, updateOne, deleteOne, getOwnerById }
