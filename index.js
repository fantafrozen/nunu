const api = require("@justalk/pornhub-api") 
const { exec } = require("child_process")
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();
const fs = require("fs")
var counter = false;
api.search("chinese").then((list) => {
    list.results.forEach(e => {
        if(e.premium) return;
        if(fs.existsSync(`./output/${e.title}.mp4`))return;
        if(counter) return;
        counter = true;
        console.log(e.title)
        api.page(e.link, ['title','download_urls']).then(async r=>{
          //  exec(`wget -c -O "./output/${e.title}.m3u8" "${r.download_urls["1080P"]}"`,(a,b,c)=>
          await converter
          .setInputFile(r.download_urls["1080P"])
          .setOutputFile("./output/"+e.title+".mp4")
          .start();
        });
    })
})
