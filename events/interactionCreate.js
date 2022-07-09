const Config = require("../components/config");
module.exports = {
	name: 'interactionCreate',
	once: false,
	execute: async function(interaction,client) {
		try{
			const config = Config(client);
			const { cor , consoleServer , erro, suporte, relatorio, terminal} = config
	
			if (!interaction.isCommand() && !interaction.isButton() && !interaction.isSelectMenu()) return;
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			if(interaction.channel.id != '875200644695355440'){
				interaction.reply(`Vá para o canal ${terminal}`)
				
				setTimeout(() => interaction.deleteReply(), 5000) 
				return
			}
			try {
				await command.execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal);
			
			} catch (error) {
				erro.setDescription('Algo deu errado ao executar o comando. \n Foi gerado um relatorio do erro e enviado aos meus desenvolvedores, pedimos desculpas pelo ocorrido :(' )
				relatorio.setTitle(`Relatorio gerado em nome de ${interaction.user.tag}`)
				relatorio.setDescription(`${interaction.user} \n ` + error.stack)
				await consoleServer.send({embeds: [relatorio]})
				await interaction.reply({ embeds: [erro], ephemeral: true });
			}
		}
		catch (err) {
			console.error(`❌ Erro encontrado: \n`,err)
		}
	}
}