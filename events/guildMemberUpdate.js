const Config = require("../components/config");
const EmbedInfo = require("../components/info");
const  Mongoose  = require("mongoose");
const Member = Mongoose.model('Member');

//precisa desenvolver isso aqui

module.exports = {
	name: 'guildMemberUpdate',
	once: false,
	execute: async function(member,client) {
		try{
			const config = Config(client);
			const { cor, info, servidor, consoleServer } = config
			const embedInfo = EmbedInfo(client, cor);
			const user = await Member.findOne({tag: member.user.tag},'id name tag cargos')
			if(user){
				newCargos = []
				client.guilds.cache.get(servidor.id).members.cache.get(member.id).roles.cache.map(role => {
					if (role.name != '@everyone'){
						newCargos.push(role.id)
					}
				})
				user.updateOne(
					({
					$set: {
						cargos: newCargos
					}
				}))
				.then(() => {
					consoleServer.send(`<:update:1010280091680518228>  Os cargos do membro **${member.user.tag}** foram atualizados.`
					)})
				.catch(error => {
					const embed = new MessageEmbed()
						.setTitle('Relatorio de erro gerado pela API:')
						.setDescription(error.stack)
						.setColor('#FF0000')
					consoleServer.send({embeds: [embed]}); 
				})
			}
			else{
				consoleServer.send(`⚠️ O membro **${member.user.tag}** atualizou os cargos, mas o mesmo não está cadastrado no sistema.`)

			}
			const panel = await client.channels.cache.get(info.channel).messages.fetch(info.panel);
			panel.edit({embeds: [embedInfo]});
		}
		catch (err) {
			console.error(err)
		}
	}
}