const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/users.json');
const users = low(adapter);
/*

const newReg = new Member({
					id: member.user.id,
					name:member.displayName,
					tag: member.user.tag,
					cargos: member._roles
				})
				newReg.save()
				.then(x=>{console.log('Membro Cadastrado com sucesso!');})
				.catch(e=> {console.log('Falha ao cadastrar membro!\n',e)})

*/
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
		const cargos = []
		member.roles.cache.map(role => {
            if(role.name != '@everyone'){
                cargos.push(role.id)
            }})
		
		users.get('membros').push({
			id: member.id,
      		tag: member.user.tag,
     		cargos: cargos,
		}).write()

		const embed = new Discord.MessageEmbed()
		.setTitle('Membro registrado com sucesso! ')
		.setDescription(`${member} agora faz parte do meu banco de dados`)
		.setColor(cor)
		message.channel.send({embeds: [embed]});
	}
};
	
