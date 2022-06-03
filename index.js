const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');

//HAZIR EVENTİ:
client.once("ready", () => {
    client.user.setPresence({ activities: [{ name:"/aç", type: "LISTENING" }] })
    console.log(client.user.tag, client.users.cache.size, "kişiyle görevine hazır!")
});

//KOMUTLARI ÇALIŞTIRMA:
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    try {
       await require(`./commands/${interaction.commandName}.js`)(interaction);
    } catch (e) { console.error(e) }

});

client.login(token);