const fs = require('fs');
const { kategoriId } = require("../config.json")
module.exports = async interaction => {

	const isim = interaction.options.getString('ad').toLocaleLowerCase("tr").replace(/ +/g, "-");
	const dosya = JSON.parse(fs.readFileSync('./odalar.json', 'utf8'));

	if (isim in dosya) return interaction.reply("Halihazırda böyle bir oda var!")

	const permissionOverwrites = [{ id: interaction.guild.id, deny: 'VIEW_CHANNEL' }, { id: interaction.user.id, allow: 'VIEW_CHANNEL' }];

	const channel = await interaction.guild.channels.create(isim, { parent: kategoriId, type: "GUILD_TEXT", reason: `${isim} için oluşturuldu.`, permissionOverwrites })
	await interaction.guild.channels.create(isim, { parent: kategoriId, type: "GUILD_VOICE", reason: `${isim} için oluşturuldu.`, permissionOverwrites })

	channel.send(`Odan açıldı!\nArkadaşların \`/katıl ${isim}\` şeklinde katılabilir.`);

	dosya[isim] = interaction.user.id;

	fs.writeFileSync('./odalar.json', JSON.stringify(dosya))

	await interaction.reply(isim + ' adlı takımın başarıyla açıldı!');

};

