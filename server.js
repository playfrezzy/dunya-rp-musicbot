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

module.exports = {
  bot: client
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
