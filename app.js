const express = require('express')
const app = express()
const port = 3000
const GenerateURL = require('./models/url')
const exphbs = require('express-handlebars')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
