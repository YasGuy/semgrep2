const express = require('express')
const app = express()
const port = 3000
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:')
const util = require('util')


 app.get('/test1', async (req, res) => {
  // ruleid: tainted-sql-string
  const [results, metadata] = await sequelize.query("SELECT * FROM `users`" + " WHERE id = '" + req.query.message + "'");
  res.send(results)
})

app.get('/test2', async (req, res) => {
  // ruleid: tainted-sql-string
  let query = `SELECT * FROM users WHERE id = '${req.query.message}'`
  const [results, metadata] = await sequelize.query(query);
  res.send(results)
})

app.get('/test3', async (req, res) => {
  let query = "SELECT * FROM `users` WHERE id = '"
  // ruleid: tainted-sql-string
  query = query.concat(req.query.message)
  query = query.concat("'")
  const [results, metadata] = await sequelize.query(query);
  res.send(results)
})


app.get('/ok', async (req, res) => {
    // ok: tainted-sql-string
    res.send("message: " + req.query.message);
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
