const pool = require('../config/db')
const profileImage = '../images/iconoPerfil.png'

const selectAll = async (teamId) => {
    [result] = await pool.query("SELECT u.Id, u.Username, u.Mail, u.Img FROM UsersTeams ut JOIN Users u ON ut.UserID = u.Id WHERE ut.TeamID = ?", [teamId])
    return result;
}
const selectById = async (userId) => {
    [result] = await pool.query("SELECT * FROM users WHERE Id = ?", [userId])
    if (result.length === 0) return null
    return result[0]
}
const selectByName = async (userName, teamId) => {
    [result] = await pool.query("SELECT u.* FROM users u JOIN usersteams ut ON u.Id = ut.UserID Join teams t ON ut.TeamID = t.Id WHERE u.username LIKE ? AND t.id = ? ", [`%${userName}%`, teamId])
    if (result.length === 0) return null
    return result

}
const selectByMail = async (mail) => {
    [result] = await pool.query("SELECT * FROM users WHERE mail LIKE ?", [`%${mail}%`])
    if (result.length === 0) return null
    return result[0]
}
const addUser = async ({ username, mail, password }) => {
    const [result] = await pool.query("insert into users (username, mail, password, img) values(?, ?, ?, ?)", [username, mail, password, profileImage])
    return result
}
const updateById = async (userId, { username, mail, password }) => {
    const [result] = await pool.query(
        "update users set username = ?, mail = ?, password = ? WHERE id = ?",
        [
            username,
            mail,
            password,
            userId,
        ]
    )
    return result
}
const deleteById = async (userId) => {
    const [result] = await pool.query("delete from users WHERE id = ?", [userId])
    return result
}


module.exports = { selectAll, selectById, selectByName, selectByMail, addUser, updateById, deleteById }