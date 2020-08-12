module.exports.run = (bot, message, args) => {
  if(message.member.id != ayarlar.SAHIP1 && message.member.id != ayarlar.SAHIP2) return message.reply("Bunu yapmak için yetkin yok!");
  const { channel } = message.member.voice;
  if (!channel) return message.channel.send('Bir sesli kanala bağlanman gerekiyor!');
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('Şuan hiçbir şarkı çalmıyor!');
  if (!args[0]) return message.channel.send(`Şuanki ses düzeyi: **${serverQueue.volume}**`);
  serverQueue.volume = args[0]; // eslint-disable-line
  serverQueue.connection.dispatcher.setVolumeDecibels(args[0]);
  return message.channel.send(`I set the volume to: **${args[0]}**`);
};

module.exports.conf = {
  aliases: ["sesayarla", "ses-ayarla", "ses"],
  enabled: 'yes',
  guild: true,
  args: true
}

module.exports.help = {
  name: "volume",
  usage: "volume",
  category: "Kullanıcı"
}