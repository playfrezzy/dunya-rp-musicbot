module.exports = {
	name: 'durdur',
	description: 'Şarkıyı durdurur.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Bunun için sesli bir kanala bağlanman gerekiyor!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Şuan çalınan bir şey yok.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Senin için şarkı durduruldu!');
	}
};
