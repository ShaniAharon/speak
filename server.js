const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config();
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;


const app = express()
// const http = require('http').createServer(app)

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());
// Express App Config
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
const corsOptions = {
  origin: true,
  credentials: true
}
app.use(cors(corsOptions))
app.use(express.static('public'))
if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.resolve(__dirname, 'public')))
}
// else {
//   const corsOptions = {
//     origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true
//   }
//   app.use(cors(corsOptions))
// }

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
