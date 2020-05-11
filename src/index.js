require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require('discord.js');
const express = require('express');
const app = express();
const http = require('http');
const client = new MusicClient({ token: process.env.DISCORD_TOKEN, prefix: process.env.DISCORD_PREFIX });

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('DM\'den bu komutu yapamıyorum.');
	if (command.args && !args.length) {
		let reply = `Lütfen bir değer gir, ${message.author}!`;
		if (command.usage) reply += `\nDoğru kullanım: \`${client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Lütfen \`${command.name}\` komutunu bir daha kullanabilmek için ${timeLeft.toFixed(1)} saniye daha bekle!`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Bir hata oluştu!');
	}
});

client.login(client.config.token);

client.on('ready', async function() {
  console.log(`Bot, ${client.user.username} ismi ile hazır!`);
  client.user.setStatus("online");
  
  let states = [
    `+yardım`,
    `#evdekaltürkiye`
  ]
  
  setInterval(function() {
    let state = states[Math.floor(Math.random() * states.length)];
    client.user.setActivity(state, {type: 'PLAYING'})
  }, 5000)
});

app.get("/", (request, response) => {
  console.log("Botu açık tutmak için yeniden bağlandım!");
  response.sendStatus(200);
});
app.listen(8080);
setInterval(() => {
  http.get(`https://dunya-rp.glitch.me`);
}, 280000);
