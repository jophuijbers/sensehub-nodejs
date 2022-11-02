# SenseHub

NodeJS API and video server for SenseHub

## Scripts
Install dependencies: ```npm install```

Hot-reload server: ```npm run dev```

Normal server: ```npm run start```

## Download YT

Install: [YT_DLP](https://github.com/yt-dlp/yt-dlp)

### Download a video or playlist from YouTube

```sudo yt-dlp -f "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" <url>```

## Compression and conversion

### Recursive command to convert all files in (nested) folders from .mp4 to .mkv

```for i in {*.mkv,*/*.mkv,*/*/*.mkv,*/*/*/*.mkv}; do ffmpeg -i "$i" -c:v libx264 -pix_fmt yuv420p -crf 30 -c:a aac -movflags +faststart "${i%.*}.mp4"; done```

### Convert .mp4 to .mp4 that is displayable on all devices and browsers

Multiple files:

```for i in {*.mp4,*/*.mp4,*/*/*.mp4,*/*/*/*.mp4}; do ffmpeg -i "$i" -c:v libx264 -pix_fmt yuv420p -crf 30 -c:a aac -movflags +faststart "${i%.*}xx.mp4"; done```

Single file:

```ffmpeg -i <full_path> -c:v libx264 -pix_fmt yuv420p -crf 30 -c:a aac -movflags +faststart <full_path>xx.mp4```

Then, remove all old .mp4 files and run following command to remove xx from file name:

```for file in {*,*/*,*/*/*}; do mv "${file}" "${file/xx/}"; done```

## Linux / Nginx commands

Recursively changes ownership and permissions of all (sub)directories and (sub)files

```sudo chmod -R 775 <file_path/directory_path>; sudo chown -R blokfluit:webgroup <file_path/directory_path>```

### API commands using PM2

Start pod: ```pm2 start /var/www/api.sensegang.nl/src/app.js```

Restart pod: ```pm2 restart 0```

Stop pod: ```pm2 stop 0```

Check status: ```pm2 status```

Check logs: ```pm2 logs```

Clear logs: ```pm2 flush```

### Setup HTTPS for Nginx
https://dev.to/knowbee/how-to-setup-secure-subdomains-using-nginx-and-certbot-on-a-vps-4m8h