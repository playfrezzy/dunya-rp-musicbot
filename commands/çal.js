const ytdl = require('ytdl-core');
const { Util } = require('discord.js');
module.exports.run = async (client, message, args) => {
		const channel = message.member.voiceChannel;
		if (!channel) return message.channel.send('Sesli bir kanalda değilsin!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Oraya katılmak için iznim yok! (Bağlanma)');
		if (!permissions.has('SPEAK')) return message.channel.send('Oraya katılmak için iznim yok! (Konuşma)');
    
    let validate = await ytdl.validateURL(args[0]);
    if(!validate) {
      let commandFile = require('./ara.js');
      return commandFile.run(client, message, args);
    }

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
      message.delete()
			return message.channel.send(`✅ **${song.title}** şuan sıraya eklendi!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 1,
			playing: true,
      mode: 0
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
      message.delete()
			queue.textChannel.send(`🎶 Şuan çalıyor: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Şuan sesli kanala katılamıyorum: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`Şuan sesli kanala katılamıyorum: ${error}`);
		}
};

module.exports.conf = {
  aliases: ["play"],
  enabled: 'yes',
  guild: true,
  args: true
}

module.exports.help = {
  name: "çal",
  usage: "çal <şarkı|link>",
  category: "Kullanıcı"
}