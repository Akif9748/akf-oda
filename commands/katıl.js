const fs = require("fs")

module.exports = async interaction => {
	const takımlar = JSON.parse(fs.readFileSync('./odalar.json', 'utf8')),
		isim = interaction.options.getString('ad').toLocaleLowerCase("tr").replace(/ +/g, "-")

	if (isim in takımlar === false) return interaction.reply("Böyle bir özel oda yok.")

	const yazı = interaction.guild.channels.cache.find(c => c.name == isim && c.type == 'GUILD_TEXT'),
		ses = interaction.guild.channels.cache.find(c => c.name === isim && c.type == 'GUILD_VOICE')

	const filter = response => response.content.toLowerCase() === "evet" && response.author.id == takımlar[isim]

	await interaction.reply(`Özel odanın onay listesine girdin. <@${takımlar[isim]}> bu mesaja **"evet"** yanıtını verirse odaya katılmış olacaksın. 30 saniyelik bir zaman aşımı var.`)

	try {
		await interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
		await yazı.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true });
		await ses.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true });
		await interaction.editReply(`${interaction.user} odaya kabul edildin!`);
	} catch {
		await interaction.editReply(`${interaction.user} odaya kabul edilmedin.`);
	}


};

