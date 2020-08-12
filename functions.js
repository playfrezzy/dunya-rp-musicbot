const fs = require("fs");
module.exports = bot => {
  fs.readdir("./handlers/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("Yükleyecek event yok...");

    console.log(`${jsfiles.length} tane event yükleniyor...`);
    jsfiles.forEach((f, i) => {
      require(`./handlers/${f}`);
      let c = f.split(".")[0];
      console.log(`${i + 1}: ${c} yüklendi.`);
    });
  });

  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log("Yükleyecek komut yok...");

    console.log(`${jsfiles.length} tane komut yükleniyor...`);
    jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      let c = f.split(".")[0];
      console.log(`${i + 1}: ${c} yüklendi.`);
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
};
