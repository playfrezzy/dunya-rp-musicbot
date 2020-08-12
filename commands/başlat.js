module.exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send('▶ Senin için şarkı yeniden başlatıldı!');
  }
  return message.channel.send('Şuan çalınan bir şey yok!.');
};

module.exports.conf = {
  aliases: ["resume"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "başlat",
  usage: "başlat",
  category: "Kullanıcı"
}