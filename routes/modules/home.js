const express = require('express')
const router = express.Router()
const GenerateURL = require('../../models/url')
const proceesURL = require('../../process/shortenURL')

// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 提交網址
router.post('/', (req, res) => {
  //  沒輸入按下送出鈕，只會停留在首頁
  if (!req.body.url) {
    return res.redirect('/')
  }
  // 產生縮址
  const shortURL = proceesURL(5)

  GenerateURL.findOne({ originalUrl: req.body.url })
    .then((url) => {
      // 當db裡有過同樣的網址資料，把該資料往下傳遞
      if (url) {
        return url
      }
      // 沒有輸入過的網址資料，就在 db 裡創建一個網址和其縮址資料，並把該值往下傳遞
      return GenerateURL.create({
        originalUrl: req.body.url,
        shortenUrl: shortURL
      })
    })
    .then((url) => {
      // 同樣的網址，產生同樣的縮址
      res.render('index', {
        originalUrl: req.headers.origin,
        shortURL: url.shortenUrl,
        nonShortUrl: req.body.url
      })
    })
    .catch((err) => console.log(err))
})

// 將縮址導向原本網站
router.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  // 尋找 db 是否已含有縮址，若沒有顯示錯誤提示
  GenerateURL.findOne({ shortenUrl: shortURL })
    .lean()
    .then((data) => {
      if (!data) {
        const errorMessage = 'Invalid URL:'
        const errorURL = req.headers.host + '/' + shortURL
        return res.render('error', { errorMessage, errorURL })
      }
      // 轉址到原本 url
      res.redirect(data.originalUrl)
    })
    .catch((err) => console.log(err))
})

module.exports = router
