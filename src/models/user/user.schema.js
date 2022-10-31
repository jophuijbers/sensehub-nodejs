const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    lastLogin: {
        type: Date,
        required: false
    },
    watched: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    watchList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
    ]
}, {timestamps: true})

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

module.exports = userSchema