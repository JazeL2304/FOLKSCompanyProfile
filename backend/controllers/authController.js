const jwt = require('jsonwebtoken')
const supabase = require('../db/supabase')

const ADMIN_EMAIL = 'admin@folks.id'
const ADMIN_PASSWORD = 'folks2024'

const login = async (req, res) => {
    const { email, password } = req.body

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Email atau password salah' })
    }

    const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.json({ token, role: 'admin', email })
}

module.exports = { login }