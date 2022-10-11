function proceesURL(length) {
  let shortURL = ''
  const numbers = '0123456789'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const randomCase = numbers + lowerCaseLetters + upperCaseLetters
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * randomCase.length)
    const slectedChar = randomCase[randomIndex]
    shortURL += slectedChar
  }
  return shortURL
}

module.exports = proceesURL
