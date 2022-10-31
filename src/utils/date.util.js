const moment = require('moment')

const formatDate = (date) => {
    if (!date) return
    return moment(date).locale('nl').format('L')
}

const getPastDate = (amount, unit) => {
    return moment().subtract(amount, unit).toDate()
}

module.exports = {
    formatDate,
    getPastDate
}