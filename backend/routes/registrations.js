const express = require('express')
const router = express.Router()
const { getAll, create, updateStatus, remove } = require('../controllers/registrationController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAll)
router.post('/', authMiddleware, create)
router.patch('/:id/status', authMiddleware, updateStatus)
router.delete('/:id', authMiddleware, remove)

module.exports = router