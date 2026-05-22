const express = require('express')
const router = express.Router()
const { getAll, getOne, create, update, remove } = require('../controllers/programController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router