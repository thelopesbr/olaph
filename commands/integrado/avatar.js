const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Envia o avatar')
        .addUserOption(option =>
            option.setName('membro')
                .setDescription('Membro no qual quer extrair o avatar')
                .setRequired(true)
            
            ),
        
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        const Member = interaction.options.getMember('membro')
        const embed = new Discord.MessageEmbed()
            .setColor(cor)
            .setImage(Member.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096
            }))
		await interaction.reply({embeds: [embed]});
	},
    async run (message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        message.delete()
        const mention = message.mentions.members.first()
        let Member = mention? mention: message.guild.members.cache.get(args[0])
        if (!Member) Member = message.member
        const embed = new Discord.MessageEmbed()
            .setColor(cor)
            .setImage(Member.user.displayAvatarURL({
                format: 'png',
                dynamic: true,
                size: 4096
            }))
        if (!args[0]) return message.channel.send({embeds: [embed.setTitle(message.author.tag)]})
        message.channel.send({embeds: [embed.setTitle(Member.user.tag)]})
    }
};

