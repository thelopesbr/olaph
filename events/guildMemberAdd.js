const { MessageEmbed } = require("discord.js");

require('../src/models/member');

const jimp = require("jimp");
const  Mongoose  = require("mongoose");
const Member = Mongoose.model('Member');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute: async function(member,client) {
		const consoleServer = client.channels.cache.get("875211327726059570");
		try{
			const welcome = client.channels.cache.get("875200645626478603");
	
			const user = await Member.findOne({tag: member.user.tag},'id name tag cargos')
			.then(data =>{
				return data
			})
            .catch(e => {
				return e
			});
			const bemvindo = new MessageEmbed()
			.setTitle(`${member.displayName} seja bem vindo ao servidor da Byte Jr!`)
			.setColor('#47dd93')
			.setTimestamp()
			.setImage('https://cdn.discordapp.com/attachments/875551615493472256/896018107825520660/MOB_-_Sistema_de_entrada_2.gif')
			
			const auth = new MessageEmbed()
			.setTitle('Você foi autenticado')
			.setDescription('Agora é só aproveitar, e qualquer problema entre em contato.')
			.setColor('#47dd93')

			await member.send({embeds: [bemvindo]});
			
			if(user){
				member.roles.set(user.cargos)
				member.send({embeds: [auth]});
			}
			else{
				try{
					console.log(`Iniciando timer para o membro ${member.user.tag}`)
					setTimeout(() => {
						member.roles.set(['875200644678570076']);
						member.send({embeds: [auth]});
					},600000)
				}
				catch{
					return
				}
			}
			let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
			let mask = await jimp.read('./img/mascara.png');
			let fundo = await jimp.read('./img/fundo.png');
			const avatarNull = 'https://cdn.discordapp.com/embed/avatars/3.png'
			const memberAvatar = member.user.avatarURL({ format: 'png', dynamic: true }) || avatarNull
			jimp.read(memberAvatar).then(avatar => {
				avatar.resize(130, 130)
				mask.resize(130, 130)
				avatar.mask(mask)
				fundo.print(fonte, 170, 175, member.user.username)
				fundo.composite(avatar, 40, 90).write('./img/bemvindo.png');
				setTimeout(() => welcome.send({content: `${member}`,files: ['./img/bemvindo.png']}), 1000);
				
			})
			.catch(err => {
				console.log(err, 'error avatar')
			})
			
		}catch (error) {
			const embed = new MessageEmbed()
			.setTitle('Relatorio de erro gerado pela API:')
			.setDescription(error.stack)
			.setColor('#FF0000')
			await consoleServer.send({embeds: [embed], content: '⚠️ **ALERTA:** Pode ser que não tenha gerado Boas Vindas ao membro!!'}); 
		}
		finally{
			await consoleServer.send(`**${member.user.tag}** entrou no servidor **${member.guild}**`)
		}
	}
}
