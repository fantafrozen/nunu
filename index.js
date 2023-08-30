const api = require("@justalk/pornhub-api") 
const { exec } = require("child_process")
const fs = require("fs")
var counter = 0
api.search("chinese").then((list) => {
    list.results.forEach(e => {
        if(e.premium) return;
        if(fs.existsSync(`./output/${e.title}.mp4`))return;
        if(counter > 4)return;counter++;
        api.page(e.link, ['title','download_urls']).then(r=>{
           // exec(`wget -c -O "./output/${e.title}.m3u8" "${e.download_urls["1080p"]}"`)
            exec(`ffmpeg -i "${r.download_urls["1080P"]}.m3u8" -c copy "./output/${e.title}.mp4"`)
    
        });
    })
})
