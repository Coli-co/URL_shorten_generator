const express = require('express')
const app = express()
const port = 3000
const GenerateURL = require('./models/url')
require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
