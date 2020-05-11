module.exports = {
	name: 'atla',
	description: 'Şarkıyı atlar.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Bunun için sesli bir kanalda olman gerekiyor.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok!');
		serverQueue.connection.dispatcher.end('Şarkı senin için atlatıldı!');
	}
};
