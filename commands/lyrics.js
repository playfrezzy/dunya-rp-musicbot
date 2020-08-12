const ytdl = require('ytdl-core');
const { RichEmbed } = require('discord.js');
const geniusLyricsAPI = process.env.LYRICS_API;
const cheerio = require('cheerio');
const fetch = require('node-fetch');
module.exports.run = async (client, message, args) => {
  
  if (!args.join(" ")) return message.channel.send("Lütfen bir şarkı ismi giriniz!");
  
  let songName = args.join(" ");
  
  const sentMessage = await message.channel.send(
    '👀 Searching for lyrics 👀'
  );

  // get song id
  var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

  const headers = {
    Authorization: `Bearer ${geniusLyricsAPI}`
  };
  try {
    var body = await fetch(url, { headers });
    var result = await body.json();
    const songID = body.response.hits[0].result.id;

    // get lyrics
    url = `https://api.genius.com/songs/${songID}`;
    body = await fetch(url, { headers });
    result = await body.json();

    const song = result.response.song;

    let lyrics = await getLyrics(song.url);
    lyrics = lyrics.replace(/(\[.+\])/g, '');

    if (lyrics.length > 4095)
      return message.say('Lyrics are too long to be returned as embed');
    if (lyrics.length < 2048) {
      const lyricsEmbed = new RichEmbed()
        .setColor('#00724E')
        .setDescription(lyrics.trim());
      return sentMessage.edit('', lyricsEmbed);
    } else {
      // lyrics.length > 2048
      const firstLyricsEmbed = new RichEmbed()
        .setColor('#00724E')
        .setDescription(lyrics.slice(0, 2048));
      const secondLyricsEmbed = new RichEmbed()
        .setColor('#00724E')
        .setDescription(lyrics.slice(2048, lyrics.length));
      sentMessage.edit('', firstLyricsEmbed);
      message.channel.send(secondLyricsEmbed);
      return;
    }
  } catch (e) {
    console.error(e);
    return sentMessage.edit(
      'Something when wrong, please try again or be more specific'
    );
  }
  async function getLyrics(url) {
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    return $('.lyrics')
      .text()
      .trim();
  }
};

module.exports.conf = {
  aliases: [],
  enabled: 'yes',
  guild: true,
  args: false
}

module.exports.help = {
  name: "lyrics",
  usage: "lyrics",
  category: "Kullanıcı"
}