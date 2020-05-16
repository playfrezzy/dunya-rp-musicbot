const ytdl = require('ytdl-core');
module.exports.run = (bot, message, args) => {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Bunun için sesli bir kanalda olman gerekiyor.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok!');
    
    /*let userCount = channel.members.size;
    
    let required = Math.ceil(userCount/2);
    
    if(!serverQueue.voteSkips) serverQueue.voteSkips = [];
    
    if(serverQueue.voteSkips.includes(message.member.id)) return message.reply("Sen zaten şarkıyı atlamak için oyladın!");
    
    serverQueue.voteSkips.push(message.member.id);
    
    message.reply(`Başarıyla şarkıyı atlamak için oyladın! (${serverQueue.voteSkips.length}/${required} Oy)`);
    
    if(serverQueue.voteSkips.length >= required) {*/
      if(serverQueue.mode === 1) {
        serverQueue.connection.dispatcher
          .on('finish', () => {
            serverQueue.songs.shift();
            serverQueue.connection.play(ytdl(serverQueue.songs[0]))
          })
          .on('error', error => console.error(error));
        serverQueue.mode = 0;
      }
		  serverQueue.connection.dispatcher.end('Şarkı oy çokluğu ile atlatıldı!');
      serverQueue.voteSkips = [];
    //}
};

module.exports.conf = {
  aliases: ["skip"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "atla",
  usage: "ara",
  category: "Kullanıcı"
}