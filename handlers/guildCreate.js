const {bot} = require('../server');
const Discord = require('discord.js');
const fs = require('fs');
bot.on('guildCreate', guild => {
  console.log(`${guild.name} sunucusuna az önce giriş yaptım! (ID: ${guild.id}`)
  guild.defaultChannel.send("Herkese Merhaba! Az önce bu sunucuya geldim!")
  let birim = JSON.parse(fs.readFileSync("./storage/birim.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  birim[guild.id] = {
    birim: ""
  }
  prefixes[guild.id] = {
    prefixes: "!"
  }
  fs.writeFile("./storage/birim.json", JSON.stringify(birim), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile("./storage/prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err)
  });
})