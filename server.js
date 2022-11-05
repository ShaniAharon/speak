const express = require('express')
const cors = require('cors')
// const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config();


const app = express()
// const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
const corsOptions = {
  origin: true,
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.static('public'))


// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
// const toyRoutes = require('./api/toy/toy.routes')
const chatRoutes = require('./api/chat/chat.routes')
// const reportRoutes = require('./api/report/report.routes')
const taskRoutes = require('./api/task/task.routes')
// const reviewRoutes = require('./api/review/review.routes')
// const { connectSockets } = require('./services/socket.service')

// routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/toy', toyRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/task', taskRoutes)
// app.use('/api/review', reviewRoutes)

// connectSockets(http)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
app.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
