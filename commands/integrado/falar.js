const Discord = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('falar')
		.setDescription('Fala utilizando o Olaph')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Canal no qual a mensagem está')
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('Mensagem que deseja enviar')
                .setRequired(true)
            ),
    async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
     
        const canal = interaction.options.getChannel('canal');
        const msg = await canal.messages.fetch(interaction.options.getString('mensagem'));
        
        canal.send(msg);

        const embedTerminal = new Discord.MessageEmbed()
        .setTitle('Mensagem enviada com sucesso!')
		.setColor(cor)
        
        const embedConsole = new Discord.MessageEmbed()
        .setTitle('✅ Mensagem enviada!')
        .setColor(cor)
        .setDescription(`👤 **Autor:** ${interaction.member}\n📪 **Canal:** ${canal}\n ✉️ **Mensagem:** ${msg.content}`)
        .setTimestamp()

        await interaction.reply({embeds: [embedTerminal], ephemeral: true});
        consoleServer.send({embeds: [embedConsole]});
        
    },
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        return 
    }
}

