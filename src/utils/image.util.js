const saveImage = (name, image) => {
    if (!name || !image) return

    const fileName = `${name}.${image.mimetype.split('/')[1]}`
    image.mv(`./public/thumbnails/${fileName}`)
    return fileName
}

const getImagePath = (image) => {
    const base = process.env.API_URL + '/thumbnails/'
    const name = image !== undefined ? image : 'default.png'
    return base + name
}

module.exports = {
    saveImage,
    getImagePath
}