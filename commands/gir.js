module.exports.run = (client, message, args) => {
  let channel = message.member.voice.channel;
  if (!channel) return message.channel.send('Bunun için sesli bir kanala bağlanman gerekiyor!');
  channel.join();
  message.channel.send("Başarıyla kanala girdi!");
};

module.exports.conf = {
  aliases: ["join"],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "gir",
  usage: "gir",
  category: "Kullanıcı"
}