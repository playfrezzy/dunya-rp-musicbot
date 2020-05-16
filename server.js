const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const express = require('express');
const app = express();
const http = require('http');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

const ayarlar = require("./ayarlar.json");

var logs = ayarlar.channels.logs;
var sınır1 = ayarlar.channels.sınır;

require("./functions")(client);

//Command Handler
client.commands = new Collection();
client.aliases = new Collection();

client.on('message', async message => {
  let msg = message.content.toLowerCase();
  
  if(!msg.startsWith('+')) return;
  
  if(msg === "+denetle") {
    const queueConstruct = {
      textChannel: null,
      voiceChannel: null,
      connection: null,
      songs: [],
      volume: 2,
      playing: false,
      mode: 0
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    message.channel.send("Denetlendi!");
  }
})

module.exports = {
  client: client
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (request, response) => {
  console.log("Botu açık tutmak için yeniden bağlandım!");
  response.sendStatus(200);
});
app.listen(8080);
setInterval(() => {
  http.get(`http://dunya-rp-musicbot.glitch.me`);
}, 280000);
