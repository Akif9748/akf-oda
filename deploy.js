const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const body = [new SlashCommandBuilder()
    .setName('aç')
    .setDescription('Özel odayı açmak için.')
    .addStringOption(option => option.setName('ad').setDescription('Odanın adı').setRequired(true)),

new SlashCommandBuilder()
    .setName('katıl')
    .setDescription('Odaya katılmak için.')
    .addStringOption(option => option.setName('ad').setDescription('Odanın adı').setRequired(true)),

new SlashCommandBuilder()
    .setName('çık')
    .setDescription('Odadan çıkmak veya çıkarmak için.')
    .addStringOption(option => option.setName('ad').setDescription('Odanın adı').setRequired(true))
    .addUserOption(option => option.setName('kullanıcı').setDescription('Odadan atacağın kişiyi seç. Eğer kendini atacaksan bunu işaretleneye gerek yok').setRequired(false))

];


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Komutlar yüklenmeye başlandı!');

        await rest.put(`/applications/${clientId}/guilds/${guildId}/commands`, { body });
        
        console.log('Komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error(error);
    }
})();