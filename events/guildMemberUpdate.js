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
			const { cor } = config
			const embedInfo = EmbedInfo(client, cor);
			const cargos = []
			const user = await Member.findOne({tag: member.user.tag},'id name tag cargos')
			
			client.guilds.cache.get('875200644678570075').members.cache.get(member.id).roles.cache.map(role => {
				if(role.name != '@everyone'){
					cargos.push(role.id)
				}
			})
			user.assign({cargos: cargos}).write()
			const msg = await client.channels.cache.get('875200645626478605').messages.fetch('878784360193622046');
			msg.edit({embeds: [embedInfo]});
		}
		catch (err) {
			console.error(err)
		}
	}
}