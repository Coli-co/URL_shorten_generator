const express = require('express')
const app = express()
const port = 3000
require('./config/mongoose')
const GenerateURL = require('./models/url')
const proceesURL = require('./process/shortenURL')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  //  沒輸入按下送出鈕，只會停留在首頁
  if (!req.body.url) {
    return res.redirect('/')
  }
  // 產生縮址
  const shortURL = proceesURL(5)

  GenerateURL.findOne({ originalUrl: req.body.url })
    .then((url) => {
      // 沒有輸入過的網址資料，就在 db 裡創建一個網址和其縮址資料
      if (!url) {
        GenerateURL.create({ originalUrl: req.body.url, shortenUrl: shortURL })
      } else {
        // 若 db 已經有，則產生一樣的縮址
        console.log(req.headers)
        res.render('index', {
          originalUrl: req.headers.origin,
          shortURL: url.shortenUrl
        })
      }
    })
    .catch((err) => console.log(err))
})

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  // 尋找 db 是否已含有縮址
  GenerateURL.findOne({ shortenUrl: shortURL })
    .then((data) => {
      if (!data) {
        const errorMessage = 'Invalid URL:'
        const errorURL = req.headers.host + '/' + shortURL
        res.render('error', { errorMessage, errorURL })
      }
      // 轉址到原本 url
      res.redirect(data.originalUrl)
    })
    .catch((err) => console.log(err))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
