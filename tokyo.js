const parzi = require("aoi.js")
var fs = require('fs')
const bot = new parzi.Bot({
    token: process.env.token,
    prefix:"$getServerVar[prefix]" 
})
bot.onJoined()
bot.onLeave()
bot.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {    
    const command = require(`./komutlar/${file}`)
    bot.command({
        name: command.name,
        code: command.code,
        aliases: command.aliases
    })
}

//durum
bot.status({
  text:"Tokyo Code",
  type:"PLAYING",
  status:"dnd",
  time: 12
})

//variable
bot.variables({
  prefix:"!",
})

//Akinator komutu
bot.command({
  name:"başla",
  aliases:["akinator","akinatör","aki","start"],
  code:`
  $djsEval[
  const akinator = require('discord.js-akinator');
  akinator(message, client, "tr");
  ]
  `
  })
