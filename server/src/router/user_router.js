const express = require('express')
const router = express.Router()

const {
  userGet,
  userGetId,
  updateRefreshToken,
  userDelete,
  userPasswordPut,
} = require('../controller/user_controller')

const checkUser = require('../middleware/user_middleware/check_user')
const comparePassword = require('../middleware/user_middleware/compare_password')
const updateUser = require('../middleware/user_middleware/update_user')

router.get('/', userGet)
router.get('/:id', userGetId)
router.put('/', checkUser, updateUser, updateRefreshToken)
router.put('/change-password', checkUser, comparePassword, userPasswordPut)
router.delete('/:id', userDelete)

module.exports = router
