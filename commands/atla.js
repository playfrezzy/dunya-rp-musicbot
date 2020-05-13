const search = require('yt-search')
module.exports.run = (bot, message, args) => {
  search(args.join(" "), function(err, res) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Bunun için sesli bir kanalda olman gerekiyor.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok!');
    
    let userCount = channel.members.size;
    
    let required = Math.ceil(userCount/2);
    
    if(!serverQueue.voteSkips) serverQueue.voteSkips = [];
    
    if(serverQueue.voteSkips.includes(message.member.id)) return message.reply("Sen zaten şarkıyı atlamak için oyladın!");
    
    serverQueue.voteSkips.push(message.member.id);
    
    message.reply(`Başarıyla şarkıyı atlamak için oyladın! (${serverQueue.voteSkips.length}/${required} Oy)`);
    
    if(serverQueue.voteSkips.length >= required) {
		  serverQueue.connection.dispatcher.end('Şarkı oy çokluğu ile atlatıldı!');
      serverQueue.voteSkips = [];
    }
  })
};

module.exports.conf = {
  aliases: ["skip"],
  enabled: 'yes',
  guild: false
}

module.exports.help = {
  name: "atla",
  usage: "ara",
  category: "Kullanıcı"
}