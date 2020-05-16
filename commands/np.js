module.exports.run = (bot, message, args) => {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "np",
  usage: "np",
  category: "Kullanıcı"
}