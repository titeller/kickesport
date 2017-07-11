const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const middleware = require('./middleware')

app.prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser('secret'))
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use('/static', express.static('static'))

    if (process.env.NODE_ENV === 'production') {
      server.enable('trust proxy')
      server.use(middleware.forceSSL)
    }

    server.use('/api', require('./routes/api'))
    require('./routes')(app, server)

    server.get('*', (req, res) => handle(req, res))

    const port = process.env.PORT || 3000
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on port ${port}...`)
    })
  })