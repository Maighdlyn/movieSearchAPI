const http = require('http')
const cheerio = require('cheerio')
const nodeInput = process.argv[2]
const rp = require('request-promise')

function queryIMDB(search) {
  const options = {
    uri: 'http://www.imdb.com/find?ref_=nv_sr_fn&q='+search+'&s=all',
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  return rp(options)
    .then(function($) {
      const movieNames = $('.findSection')
        .first()
        .find('.result_text')
        .map((i,element) => $(element).text())
        .toArray()
      console.log( movieNames.join('\n') )
      return movieNames.join('\n')

    })
    .catch(function (err) {
      console.log("There's an ERROR!!!")
    })

}

if (require.main === module) {
  queryIMDB(nodeInput)
}

module.exports = queryIMDB
