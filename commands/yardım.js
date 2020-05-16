const fs = require('fs');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
module.exports.run = (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./storage/prefixes.json", "utf8"));
  let prefix = prefixes[message.guild.id].prefixes;
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    
    let kullanici = new Discord.RichEmbed()
      .setTitle('**Dünya RP** Yardım Menüsü')
      .setDescription('Kullanıcı')
      .setFooter('<> Gerekli, [] Opsiyonel')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    
    let yetkili = new Discord.RichEmbed()
      .setTitle('**Dünya RP** Yardım Menüsü')
      .setDescription('Yetkili')
      .setFooter('<> Gerekli, [] Opsiyonel')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    let eglence = new Discord.RichEmbed()
      .setTitle('**Dünya RP** Yardım Menüsü')
      .setDescription('Eğlence')
      .setFooter('<> Gerekli, [] Opsiyonel')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    
    let other = new Discord.RichEmbed()
      .setTitle('**Dünya RP** Yardım Menüsü')
      .setDescription('Diğer')
      .setFooter('<> Gerekli, [] Opsiyonel')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      .setThumbnail("https://cdn.glitch.com/3d7c98a7-38ef-4cd6-8e01-f217fcfd1dde%2Fd%C3%BCnya-rp-bot.gif?v=1589291857266")
      .setColor(message.member.displayHexColor === "#000000" ? "#ffffff" : message.member.displayHexColor)
    
    jsfiles.forEach((f, i) => {
      let props = require(`../commands/${f}`);
      let command = f.split(".")[0];
      let cmd = command.split("")[0].toUpperCase();
      let cmd2 = command.slice(cmd.length);
      if(props.conf.enabled === "no") {
        return;
      }
      if(props.help.category === "Kullanıcı") {
          kullanici.addField(`**${cmd + cmd2}**, Kullanımı: ${prefix}${props.help.usage}`, `Başka : ${props.conf.aliases}`)
      }
      else if(props.help.category === "Yetkili") {
          yetkili.addField(`**${cmd + cmd2}**, Kullanımı: ${prefix}${props.help.usage}`, `Başka Adları: ${props.conf.aliases}`)
      }
      else if(props.help.category === "Eğlence") {
          eglence.addField(`**${cmd + cmd2}**, Kullanımı: ${prefix}${props.help.usage}`, `Başka Adları: ${props.conf.aliases}`)     
      } else {
          other.addField(`**${cmd + cmd2}**, Kullanımı: ${prefix}${props.help.usage}`, `Başka Adları: ${props.conf.aliases}, Kategori: ${props.help.category}`)
      }
    })
    message.channel.send(kullanici)
    if(message.member.hasPermission('MANAGE_ROLES')) {
      message.channel.send(yetkili)
    }
    message.channel.send(eglence)
    message.channel.send(other)
  })
};

module.exports.conf = {
  aliases: ["help"],
  enabled: 'yes',
  guild: false,
  args: false
}

module.exports.help = {
  name: "yardım",
  usage: "yardım",
  category: "Kullanıcı"
}