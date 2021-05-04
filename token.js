const request = require("request");

let {
    clientid,
    clientsecret
} = require('./config.json')
const options = {
    url: 'https://id.twitch.tv/oauth2/token',
    json:true,
    body: {
    client_id: clientid,
    client_secret: clientsecret,
    grant_type: 'client_credentials'
    }
};

request.post(options, (err,res,body)=>{
    if(err){
        return console.log(err);
    }
    console.log(body.access_token); 
});