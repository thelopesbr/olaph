const Config = require("../components/config");
const EmbedInfo = require("../components/info");
module.exports = {
	name: 'channelDelete',
	once: false,
	execute: async function(activator,client,prefix) {
        try{
            const config = Config(client);
            const { cor } = config
            const embedInfo = EmbedInfo(client, cor);
    
            const msg = await client.channels.cache.get('875200645626478605').messages.fetch('878784360193622046');
            msg.edit({embeds: [embedInfo]})
            }
        catch (err) {
            console.error(err)
        }
    }
}