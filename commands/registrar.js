const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

//database
require('../src/models/member');
const  Mongoose  = require("mongoose");
const Member = Mongoose.model('Member');

module.exports = {
	name: 'registrar',
	aliases: ['reg','register'],
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registra um membro no banco de dados'),
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
		if(!message.member.roles.cache.has("878761418067963984") || !args[0])return
		message.delete()
		const member =  message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) 
		const newReg = new Member({
				id: member.user.id,
				name:member.displayName,
				tag: member.user.tag,
				cargos: member._roles,
				live: false,
				twitch: '',
		})
		
		newReg.save()
		.then(() =>{
			const embed = new Discord.MessageEmbed()
			.setColor(cor)
			.setTitle('Membro registrado com sucesso!')
			.setDescription(`${member} agora faz parte do meu banco de dados`)
			message.channel.send({embeds: [embed]});
		})
		.catch(e => {
			const embed = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle('Falha ao cadastrar membro!')
			.setDescription(`Erro: ${e}`)
			message.channel.send({embeds: [embed]});
		})
	}
};
	
