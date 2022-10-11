const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortenSchema = new Schema({
  originalUrl: { type: String, require: true },
  shortenUrl: { type: String, require: true }
})

module.exports = mongoose.model('GenerateURL', urlShortenSchema)
