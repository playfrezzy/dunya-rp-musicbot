const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const ms = require('ms');
const ayarlar = require("./ayarlar.json");
const client = new MusicClient({ token: ayarlar.token, prefix: ayarlar.prefix });

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

  // "scripts": {
  //   "start": "node server.js"
  // },