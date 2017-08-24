const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const middleware = require('./middleware')

const passport = require('passport')
const SteamStrategy = require('./lib/passport-steam').Strategy

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


const port = process.env.PORT || 3000
const url_production = 'https://kickesport.com'
const url_development = `http://localhost:${port}`
passport.use(new SteamStrategy({
    returnURL: `${process.env.NODE_ENV === 'production' ? url_production : url_development}/api/steam/return`,
    realm: `${process.env.NODE_ENV === 'production' ? url_production : url_development}`,
    apiKey: '191C4873D578C80D9171B4DF3B9A1A9F'
  },
  function(identifier, profile, done) {
    return done(null, profile)
  }
))

app.prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser('secret'))
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use('/static', express.static('static'))
    server.use(passport.initialize())

    if (process.env.NODE_ENV === 'production') {
      server.enable('trust proxy')
      server.use(middleware.forceSSL)
    }

    server.use('/api', require('./routes/api'))
    require('./routes')(app, server)

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on port ${port}...`)
    })
  })