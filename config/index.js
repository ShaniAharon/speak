// figure out what set of credentials to return
// if - we are in production - return the prod set of keys
// else - we are in development - return the dev keys

module.exports = process.env.NODE_ENV === 'production' ?
  require('./prod') :
  require('./dev')

