const fs = require("fs")

module.exports =async interaction => {


    const dosya = JSON.parse(fs.readFileSync('./odalar.json', 'utf8')),
        name = interaction.options.getString('ad').toLocaleLowerCase("tr").replace(/ +/g, "-"),
        kullanıcı = interaction.options.getUser('kullanıcı');

    if (name in dosya === false) return interaction.reply("Böyle bir özel oda yok.")

    const yazı = interaction.guild.channels.cache.find(c => c.name == name && c.type == 'GUILD_TEXT'),
        ses = interaction.guild.channels.cache.find(c => c.name === name && c.type == 'GUILD_VOICE')

    if (kullanıcı) {
        if (interaction.user.id !== dosya[name]) return interaction.reply("Başka insanları atmak için yetkin yok. Sadece kendini atabilirsin :grin:")
        await yazı.permissionOverwrites.edit(kullanıcı.id, { VIEW_CHANNEL: false });
        await ses.permissionOverwrites.edit(kullanıcı.id, { VIEW_CHANNEL: false });

        await interaction.reply(`${kullanıcı} odadan atıldı!`);


    } else {
        if (interaction.user.id === dosya[name]) return interaction.reply("Kendi odandan çıkamazsın. Direkt odanı silmek yada devretmek için yetkililere haber ver.")

        await yazı.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false });
        await ses.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false });
        await interaction.reply(`${interaction.user} odadan atıldı!`);

    }

};

