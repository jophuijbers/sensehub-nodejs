const express = require('express')
const cors = require('cors')
const routes = require('../src/routes')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

app.use('/api', routes)

module.exports = app