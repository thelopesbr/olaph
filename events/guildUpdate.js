const Config = require("../components/config");
const EmbedInfo = require("../components/info");
module.exports = {
	name: 'guildUpdate',
	once: false,
	execute: async function(activator,client,prefix) {
		try{
			const { cor, info } = Config(client);
	
			const embedInfo = EmbedInfo(client, cor);
			const panel = await client.channels.cache.get(info.channel).messages.fetch(info.panel);
		
			panel.edit({embeds: [embedInfo]});
		}
		catch (err) {
			console.error(err)
		}
	}
}