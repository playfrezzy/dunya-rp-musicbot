module.exports.run = (client, message, args) => {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("Şuan çalınan bişey yok!");
    return message.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Now playing:** ${serverQueue.songs[0].title}
		`);
};

module.exports.conf = {
  aliases: ["gueue"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "sıra",
  usage: "sıra",
  category: "Kullanıcı"
}