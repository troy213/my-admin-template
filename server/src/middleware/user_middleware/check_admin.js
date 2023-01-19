const db = require('../../config/db_config')

const checkAdmin = (req, res, next) => {
  const { id } = req.body
  const sql = 'SELECT * FROM users WHERE roles=1'
  db.query(sql, id, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err })
    if (result.length === 1 && res.locals.roles === 1) {
      return res.status(400).json({
        success: false,
        message: 'You need atleast 1 admin left to run this program',
      })
    } else {
      next()
    }
  })
}

module.exports = checkAdmin
