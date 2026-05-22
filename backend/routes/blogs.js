const express = require('express')
const router = express.Router()
const { getAll, getOne, create, update, remove } = require('../controllers/blogController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getAll)
router.get('/:slug', getOne)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

module.exports = router