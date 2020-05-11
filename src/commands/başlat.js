module.exports = {
	name: 'başlat',
	description: 'Şarkıyı yeniden başlatır.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Senin için şarkı yeniden başlatıldı!');
		}
		return message.channel.send('Şuan çalınan bir şey yok!.');
	}
};
