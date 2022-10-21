const database = require('./config/database')
const app = require('./config/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})

database.connect()