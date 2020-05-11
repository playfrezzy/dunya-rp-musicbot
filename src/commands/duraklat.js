module.exports = {
	name: 'duraklat',
	description: 'Şarkıyı duraklatır.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Senin için müzik durdu!');
		}
		return message.channel.send('Şuan çalınan bir şey yok!');
	}
};
