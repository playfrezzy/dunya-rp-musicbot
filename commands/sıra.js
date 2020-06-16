module.exports.run = (bot, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("Şuan çalınan bişey yok!");
  
  let msg = `\`\`\`fix\nSong queue`;
  var i = 0;
  
  serverQueue.songs.forEach(song => {
    i++;
    msg += `\n\n  ${i} - ${song.title}`
  })
  msg += `\n\nNow playing: ${serverQueue.songs[0].title}\n\`\`\``
  
  message.channel.send(msg)
  
};

module.exports.conf = {
  aliases: ["gueue"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "sıra",
  usage: "sıra",
  category: "Kullanıcı"
}