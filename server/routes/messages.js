const { turso } = require('../database.js')

async function createMessage(req, res) {
  const { content, backgroundColor, textColor } = req.data

  const result = await turso.execute({
    sql: 'insert into messages (content, backgroundColor, textColor) values(?, ?, ?) returning *',
    args: [content, backgroundColor, textColor],
  })

  const [createdMessage] = result.rows

  res.json({ created: createdMessage })
}

async function getMessages(req, res) {
  const { rows: messages } = await turso.execute('select * from messages;')
  res.json({ messages })
}

module.exports = { createMessage, getMessages }
