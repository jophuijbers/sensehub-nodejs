const moment = require('moment')

const formatDate = (date) => {
    if (!date) return
    return moment(date).locale('nl').format('L')
}

module.exports = {
    formatDate
}