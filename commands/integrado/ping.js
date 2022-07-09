const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Mostra o ping do Olaph'),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
		const embed = new Discord.MessageEmbed()
		.setDescription(`Estou com ${Math.floor(client.ws.ping)} de ping!`)
		.setColor(cor)
		await interaction.reply({embeds: [embed]});
	},
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
		message.delete()
		const embed = new Discord.MessageEmbed()
		.setDescription(`Estou com ${Math.floor(client.ws.ping)} de ping!`)
		.setColor(cor)
		await message.channel.send({embeds: [embed]});
	}
};
	
