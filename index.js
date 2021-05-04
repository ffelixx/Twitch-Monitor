const fetch = require('node-fetch')
const fs = require('fs')
const Discord = require('Discord.js');
const colors = require('colors')
const client = new Discord.Client();
let {
    clientid,
    accesstoken,
    streamer,
    delay,
    channel,
    token
} = require('./config.json')

async function isLive() {
    streamer.forEach(async streamere =>{
    let streamer = streamere;
    while (i = 1) {
        await fetch(`https://api.twitch.tv/helix/search/channels?query=${streamer}`, {
                "headers": {
                    'Client-ID': clientid,
                    'Authorization': `Bearer ${accesstoken}`
                }
            })
            .then(async res => {
                return res.json();
            })
            .then(async data => {
                let stream = data.data.filter(element => element.display_name == streamer)
                if (stream.toString().length > 10) {
                    let live = stream[0].is_live;
                    let name = stream[0].display_name;
                    if (live == true) {
                        let e = client.channels.cache.get(channel);
                        e.send(`@everyone\nhttps://twitch.tv/${name}`);
                        console.log(`Live, sleeping for ${delay}ms`)
                        await sleep(delay)
                    } else {
                        hours = (new Date()).getHours();
                        minutes = (new Date()).getMinutes();
                        seconds = (new Date()).getSeconds();
                        console.log(`[${hours}:${minutes}:${seconds}]`.red, 'Not live, retrying.')
                    }
                } else {
                    console.log('Channel not found, check your spelling.')
                    process.exit()
                }
            });
        await sleep(5000)
    }
})
}

client.on("ready", () => {
    isLive()
});

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

client.login(token)