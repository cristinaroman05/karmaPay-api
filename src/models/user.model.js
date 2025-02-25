const pool = require('../config/db')
const profileImage = '../images/iconoPerfil.png'

const selectAll = async (teamId) => {
    [result] = await pool.query("select u.Id, u.Username, u.Mail, u.Img from usersTeams ut join users u ON ut.UserID = u.Id where ut.TeamID = ?", [teamId])
    return result;
}
const selectById = async (userId) => {
    [result] = await pool.query("select * from users where Id = ?", [userId])
    if (result.length === 0) return null
    return result[0]
}
const selectByName = async (userName, teamId) => {
    [result] = await pool.query("select u.* from users u join usersTeams ut on u.Id = ut.UserID join teams t on ut.TeamID = t.Id where u.username LIKE ? AND t.id = ? ", [`%${userName}%`, teamId])
    if (result.length === 0) return null
    return result

}
const selectByMail = async (mail) => {
    [result] = await pool.query("select * from users where mail LIKE ?", [`%${mail}%`])
    if (result.length === 0) return null
    return result[0]
}
const addUser = async ({ username, mail, password }) => {
    const [result] = await pool.query("insert into users (username, mail, password, img) values(?, ?, ?, ?)", [username, mail, password, profileImage])
    return result
}
const updateById = async (userId, { username, mail, password }) => {
    const [result] = await pool.query(
        "update users set username = ?, mail = ?, password = ? where id = ?",
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
    const [result] = await pool.query("delete from users where id = ?", [userId])
    return result
}


module.exports = { selectAll, selectById, selectByName, selectByMail, addUser, updateById, deleteById }