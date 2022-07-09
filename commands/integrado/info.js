
const {MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const EmbedInfo = require("../../components/info.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Mostra as informações do servidor'),
    async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        
        const embedInfo = EmbedInfo(client, cor);
        const row = new MessageActionRow()
			.addComponents(
			    new MessageButton()
				    .setLabel('Canva')
				    .setStyle('LINK')
                    .setURL('https://www.canva.com')
                    .setEmoji('877554936932601866'),
                new MessageButton()
				    .setLabel('Drive')
				    .setStyle('LINK')
                    .setURL('https://drive.google.com/drive/u/1/shared-drives')
                    .setEmoji('877554936261517352'),
                 new MessageButton()
				    .setLabel('Notion')
				    .setStyle('LINK')
                    .setURL('https://www.notion.so/Casa-Byte-Jr-3c02fdc74fff44ca80b8fddbcf849d3f')
                    .setEmoji('877554936408317992'),
			);
        interaction.reply({embeds:[embedInfo], components: [row], ephemeral: true});
    
    },
    async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        message.delete()
        const embedInfo = EmbedInfo(client, cor);
        const row = new MessageActionRow()
			.addComponents(
			    new MessageButton()
				    .setLabel('Canva')
				    .setStyle('LINK')
                    .setURL('https://www.canva.com')
                    .setEmoji('877554936932601866'),
                new MessageButton()
				    .setLabel('Drive')
				    .setStyle('LINK')
                    .setURL('https://drive.google.com/drive/u/1/shared-drives')
                    .setEmoji('877554936261517352'),
                 new MessageButton()
				    .setLabel('Notion')
				    .setStyle('LINK')
                    .setURL('https://www.notion.so/Casa-Byte-Jr-3c02fdc74fff44ca80b8fddbcf849d3f')
                    .setEmoji('877554936408317992'),
			);
        message.channel.send({embeds: [embedInfo], components: [row], ephemeral: true})
    }
}