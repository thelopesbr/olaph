const { MessageEmbed } = require("discord.js");
const Config = require("../components/config");
module.exports = {
	name: 'unhandledRejection',
	once: false,
	execute: async function(error,client) {
		try{
			const { consoleServer } = Config(client);
	
			const embed = new MessageEmbed()
			.setTitle('Relatorio de erro gerado pela API Discord:')
			.setDescription(error.stack)
			.setColor('#FF0000')

			return consoleServer.send({embeds: [embed]}); 
		}
		catch(err){
			return console.log(err.stack);
		}
	}
}