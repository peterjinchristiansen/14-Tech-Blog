require('dotenv').config({ path: './config/.env' })
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const database = require('./config/database')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const myStore = new SequelizeStore({
    db: database
})

const app = express()
const PORT = process.env.PORT || 4444

database.authenticate()
    .then(() => {
        console.log('Connected...')
    }).catch(error => {
        console.log('Failed to connect...', error.message)
    })

app.use(session({
    secret: 'shhhhhhh',
    store: myStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}))
myStore.sync()

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/htmlRoutes'))
app.use('/api', require('./routes/apiRoutes'))

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}...`)
})