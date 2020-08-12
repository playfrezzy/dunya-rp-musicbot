const ytdl = require('ytdl-core');
module.exports.run = (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.channel.send('Bunun için sesli bir kanala bağlanman gerekiyor!');
  
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok.');
  
  serverQueue.connection.dispatcher
    .on('finish', () => {
      serverQueue.connection.play(ytdl(serverQueue.songs[0]))
    })
    .on('error', error => console.error(error));
  
  serverQueue.mode = 1;
  message.channel.send('Şuanki şarkı tekrarlanıyor!');
};

module.exports.conf = {
  aliases: ["repeat"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "tekrarla",
  usage: "tekrarla",
  category: "Kullanıcı"
}