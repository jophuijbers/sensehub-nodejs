const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = require('./user.schema')
const {generateToken} = require('../../utils/jwt.util')
const {formatDate} = require('../../utils/date.util')

userSchema.methods.toJSON = function() {
    return {
        id: this._id,
        username: this.username,
        role: this.role,
        isAdmin: this.role === 'admin',
        lastLogin: formatDate(this.lastLogin)
    }
}

userSchema.methods.toAuthJSON = function() {
    this.lastLogin = Date.now()
    this.save()

    const user = {
        id: this._id,
        username: this.username,
        isAdmin: this.role === 'admin'
    }

    const token = generateToken(user)

    return {
        user,
        token
    }
}

userSchema.methods.toJSONCreator = function() {
    return {
        id: this._id,
        username: this.username
    }
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.addToWatched = function(video) {
    if (this.watched.includes(video.id))
        return

    this.watched.push(video.id)
    this.save()
}

userSchema.methods.hasWatched = function(video) {
    return this.watched.includes(video.id)
}

module.exports = mongoose.model('User', userSchema)