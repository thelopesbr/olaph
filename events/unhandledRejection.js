const { MessageEmbed } = require("discord.js");
module.exports = {
	name: 'unhandledRejection',
	once: false,
	execute: async function(client) {
		try{
			const embed = new MessageEmbed()
			.setTitle('Relatorio de erro gerado pela API Discord:')
			.setDescription(error.stack)
			.setColor('#FF0000')

			return client.channels?.cache.get("875211327726059570").send({embeds: [embed]}); 
		}
		catch(err){
			return console.log(err.stack);
		}
	}
}