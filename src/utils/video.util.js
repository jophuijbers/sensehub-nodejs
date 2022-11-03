const {getVideoDurationInSeconds} = require('get-video-duration')
const path = require('path')
const fs = require('fs')

const getStreamPath = (collectionId, videoId) => {
    return `${process.env.API_URL}/api/stream/${collectionId}/${videoId}`
}

const saveVideos = (directory) => {
    const dir = getVideoDirectory(directory)
    const contents = getFolderContents(dir)

    let videos = []
    contents.forEach((entry) => {
        let stats = fs.statSync(`${dir}/${entry}`)
        if (stats.isFile()) {
            if (!isMp4(entry)) return
            videos.push({
                name: path.parse(entry).name,
                path: `${dir}/${entry}`
            })
        }
        else if (stats.isDirectory()) {
            let contents = getFolderContents(`${dir}/${entry}`)
            contents.forEach((entry2) => {
                if (!isMp4(entry2)) return
                videos.push({
                    name: path.parse(entry2).name,
                    path: `${dir}/${entry}/${entry2}`
                })
            })
        }
    })
    return videos
}

const updateVideos = (collection) => {
    const dir = getVideoDirectory(collection.name)
    const contents = getFolderContents(dir)

    // REMOVE VIDEOS IN DATABASE THAT ARE NOT IN FOLDER ANYMORE
    collection.videos = collection.videos.filter(video => fs.existsSync(video.path))

    // ADD MISSING VIDEOS TO DATABASE
    contents.forEach((entry) => {
        let stats = fs.statSync(`${dir}/${entry}`)
        if (stats.isFile()) {
            if (!isMp4(entry)) return
            let name = path.parse(entry).name
            if (collection.videos.some(video => video.name === name)) return // entry exists in database, so do nothing
            collection.videos.push({name: name, path: `${dir}/${entry}`}) // entry does not exist in database, so add it
        }
        else if (stats.isDirectory()) {
            let contents = getFolderContents(`${dir}/${entry}`)
            contents.forEach((entry2) => {
                if (!isMp4(entry2)) return
                let name = path.parse(entry2).name
                if (collection.videos.some(video => video.name === name)) return // entry exists in database, so do nothing
                collection.videos.push({name: name, path: `${dir}/${entry}/${entry2}`}) // entry does not exist in database, so add it
            })
        }
    })
    return collection.videos
}

const getDuration = async (videoPath) => {
    const SECONDS = await getVideoDurationInSeconds(videoPath)
    let duration = new Date(SECONDS * 1000).toISOString().substring(11, 16)
    while(duration.charAt(0) === '0' || duration.charAt(0) === ':') {
        duration = duration.substring(1);
    }
    duration += duration.length <= 2 ? 'm' : 'h'
    return duration
}

function getVideoDirectory(dir) {
    let directory = `./videos/${dir}`
    if (!fs.existsSync(directory)) directory = `./videos1/${dir}`
    return directory
}

function getFolderContents(dir) {
    const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
    return fs.readdirSync(dir).sort(collator.compare)
}

function isMp4(file) {
    return path.extname(file) === '.mp4'
}

module.exports = {
    getStreamPath,
    saveVideos,
    updateVideos,
    getDuration
}