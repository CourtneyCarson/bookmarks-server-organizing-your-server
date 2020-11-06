const { v4: uuid } = require('uuid');


const bookmarks = [
      {
      'id': uuid(),
      'title': 'Curlsbot',
      'url': 'https://www.curlsbot.com/',
      'description': 'Check product ingredients',
      'rating': 5
  },
  {
    'id': uuid(),
    'title': 'Google',
    'url': 'http://google.com',
    'description': 'where you google stuff',
    'rating': 4
  }
]
module.exports = {bookmarks};