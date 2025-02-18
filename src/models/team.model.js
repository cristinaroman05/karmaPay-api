const pool = require('../config/db')
const teamImage = '../images/team.jpg'

const selectAll = async () => {
    [result] = await pool.query("select * from teams")
    return result;
}
const selectById = async (teamId) => {
    [result] = await pool.query("select * from teams where Id = ?", [teamId])
    if (result.length === 0) return null
    return result[0]
}
const selectByName = async (teamName) => {
    [result] = await pool.query("select * from teams where name LIKE ?", [`%${teamName}%`])
    if (result.length === 0) return null
    return result[0]
}
const addTeam = async ({ name, description, category }, ownerId) => {
    const [result] = await pool.query("insert into teams (name, description, category, img, owner) values(?, ?, ?, ?, ?)", [name, description, category, teamImage, ownerId])
    return result
}
const updateById = async (teamId, { name, description, category, img }) => {
    const [result] = await pool.query(
        "update teams set name = ?, description = ?, img = ?, category = ? where id = ?",
        [
            name,
            description,
            img,
            category,
            teamId
        ]
    )
    return result
}
const deleteById = async (teamId) => {
    const [result] = await pool.query("delete from teams where id = ?", [teamId])
    return result
}


module.exports = { selectAll, selectById, selectByName, addTeam, updateById, deleteById }