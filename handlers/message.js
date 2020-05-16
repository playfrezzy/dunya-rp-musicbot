const {bot} = require('../server');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');

bot.on('message', async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  }
  
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let c = f.split('.')[0];
      if(c !== cmd) {
        let props = require(`../commands/${c}.js`);
        props.conf.aliases.forEach(al => {
          if(al === cmd) return console.log('tamam');
        })
      }
    })
  })
  
  let prefix = prefixes[message.guild.id].prefixes;
  let msg = message.content.toUpperCase();
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let command;

  if (!msg.startsWith(prefix.toUpperCase())) return;
  
  console.log(message.author.username + ', şu komutu çalıştırdı: ' + cmd)
  
  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else {
    command = bot.commands.get(bot.aliases.get(cmd));
  }
  
  if (command) command.run(bot, message, args);
  
});