module.exports.run = (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.channel.send('Bunun için sesli bir kanala bağlanman gerekiyor!');
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok.');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Senin için şarkı durduruldu!');
};

module.exports.conf = {
  aliases: ["stop"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "durdur",
  usage: "durdur",
  category: "Kullanıcı"
}