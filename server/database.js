const fs = require('fs')
const { createClient } = require('@libsql/client')

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function runMigrations() {
  const schema = fs.readFileSync('./schema.sql', 'utf-8')
  await turso.execute(schema)

  console.log('done running migrations')
}

module.exports = { turso, runMigrations }
