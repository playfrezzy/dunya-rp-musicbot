const search = require('yt-search');

module.exports = {
	name: 'ara',
	description: 'Şarkıyı yeniden başlatır.',
  args: true,
	cooldown: 5,
	async execute(message, args) {
    search(args.join(" "), function(err, res) {
      if(err) return message.channel.send("Bir hata oluştu!");
    
    
      let videos = res.videos.slice(0, 10);
    
      let resp = "";
      for(var i in videos) {
        resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
      }
    
      resp += `\n**Bir Sayı Seç: \`1-${videos.length}\``;
      
      message.channel.send(resp);
      
      const filter = m => !isNaN(m.content) && m.member == message.member && m.content < videos.length+1 && m.content > 0;
      
      const collector = message.channel.createMessageCollector(filter);
      
      collector.videos = videos;
      
      collector.once('collect', function(m) {
        
        let commandFile = require('./çal.js');
        commandFile.execute(message, [this.videos[parseInt(m.content)-1].url])
        
      })
    });
	}
};
