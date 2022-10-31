const mongoose = require('mongoose')
const userSchema = require('./user.schema')

userSchema.methods.toJSON = function() {
    return {
        id: this._id,
        username: this.username,
        role: this.role,
        isAdmin: this.role === 'admin'
    }
}

module.exports = mongoose.model('User', userSchema)