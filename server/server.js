if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')

const { rateLimit } = require('express-rate-limit')

const { createMessage, getMessages } = require('./routes/messages.js')
const createMessageValidator = require('./validation_rules/createMessageValidator.js')
const validator = require('./middleware/validator.js')

const { runMigrations } = require('./database.js')

runMigrations()

const app = express()

const PORT = process.env.PORT ?? 3000

const apiRouteLimiter = rateLimit({
  windowMs: 1000,
  limit: 1,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { errors: [{ field: 'rateLimit', message: 'Rate limit exceded.' }] },
})

app.use(cors())

app.use(express.json())

app.use(apiRouteLimiter)

app.get('/', (req, res) => {
  res.send('api up')
})

app
  .route('/messages')
  .get(getMessages)
  .post(createMessageValidator(), validator(), createMessage)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
