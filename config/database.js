const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI || 'mongodb://localhost/sensehub'

const connect = () => {
    mongoose.connect(uri)
        .then(() => {
            console.log(`connected to database at ${uri}`)
        })

    if (process.env.NODE_ENV === 'production') return

    mongoose.set('debug', true)
}

module.exports = {
    connect
}