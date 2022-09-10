const Discord = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('editar')
		.setDescription('Edita uma mensagem no servidor')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Canal no qual a mensagem está')
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('ID da mensagem que deseja editar')
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('nova-mensagem')
                .setDescription('Nova mensagem que deseja editar')
                .setRequired(true)
            ),
    async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
     
        const canal = interaction.options.getChannel('canal');
        const msg = await canal.messages.fetch(interaction.options.getString('mensagem'));
        let msgNew = interaction.options.getString('nova-mensagem');
        
        msg.edit(msgNew);

        const embedTerminal = new Discord.MessageEmbed()
        .setTitle('Mensagem editada com sucesso!')
		.setColor(cor)
        
        const embedConsole = new Discord.MessageEmbed()
        .setTitle('<:update:1010280091680518228> Mensagem editada!')
        .setColor(cor)
        .setDescription(`👤 **Autor:** ${interaction.member}\n📪 **Canal:** ${canal}\n ✉️ **Mensagem:** ${msg.content}\n📨 **Nova mensagem:** ${msgNew}`)
        .setTimestamp()

        await interaction.reply({embeds: [embedTerminal], ephemeral: true});
        consoleServer.send({embeds: [embedConsole]});
        
    },
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        return 
    }
}
