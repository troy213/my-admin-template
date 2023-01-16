const jwt = require('jsonwebtoken')

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  })
}

const sendAccessToken = (req, res, accessToken) => {
  res.send({
    accessToken,
    username: req.body.username ? req.body.username : res.locals.username,
    roles: req.body.roles ? req.body.roles : res.locals.roles,
    id: res.locals.id,
  })
}

const sendRefreshToken = (res, token) => {
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: '/api/refresh_token',
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
}
