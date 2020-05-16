module.exports.run = (bot, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send('⏸ Senin için müzik durdu!');
  }
  return message.channel.send('Şuan çalınan bir şey yok!');
};

module.exports.conf = {
  aliases: ["pause"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "duraklat",
  usage: "duraklat",
  category: "Kullanıcı"
}