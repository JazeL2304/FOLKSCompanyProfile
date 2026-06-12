const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const programRoutes = require('./routes/programs')
const blogRoutes = require('./routes/blogs')
const registrationRoutes = require('./routes/registrations')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/programs', programRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/registrations', registrationRoutes)

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})