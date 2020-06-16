module.exports.run = (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.channel.send('Bunun için sesli bir kanala bağlanman gerekiyor!');
  if(channel.id !== message.guild.me.voice.channel.id) return message.reply("Aynı sesli kanalda değiliz!");
  channel.leave();
  message.channel.send("Başarıyla kanaldan çıktı!");
};

module.exports.conf = {
  aliases: ["leave"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "çık",
  usage: "çık",
  category: "Kullanıcı"
}