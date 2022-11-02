const fs = require('fs')

const streamVideo = (video, request, response) => {
    const filePath = video.path

    const options = {}

    let start
    let end

    const range = request.headers.range
    if (range) {
        const bytesPrefix = "bytes="
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length)
            const parts = bytesRange.split("-")
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim()
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart)
                }
                const rangeEnd = parts[1] && parts[1].trim()
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd)
                }
            }
        }
    }
    
    response.setHeader("content-type", "video/mp4")

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`)
            console.error(err)
            response.sendStatus(500)
            return;
        }

        let contentLength = stat.size

        if (request.method === "HEAD") {
            response.statusCode = 200
            response.setHeader("accept-ranges", "bytes")
            response.setHeader("content-length", contentLength)
            response.end()
        }
        else {
            let retrievedLength
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start
            }
            else if (end !== undefined) {
                retrievedLength = (end+1)
            }
            else {
                retrievedLength = contentLength
            }

            response.statusCode = start !== undefined || end !== undefined ? 206 : 200

            response.setHeader("content-length", retrievedLength)

            if (range !== undefined) {
                response.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`)
                response.setHeader("accept-ranges", "bytes")
            }

            const fileStream = fs.createReadStream(filePath, options)
            fileStream.on("error", error => {
                throw error
            })

            fileStream.pipe(response)
        }
    })
}

module.exports = {
    streamVideo
}