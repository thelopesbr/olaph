const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/chaves.json');
const db = low(adapter);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chaves')
		.setDescription('Mostra a chave de acesso ao trainee')
        .addStringOption(option =>
            option.setName('diretoria')
                .setDescription('Digite a diretoria no qual quer obter a chave de acesso')
                .setRequired(true)
                .addChoice('Projetos', 'Projetos')
			    .addChoice('Gestão de Pessoas', 'Gestão de Pessoas')
			    .addChoice('Adm. Financeiro', 'Adm. Financeiro')
                .addChoice('Negocios', 'Negocios')
                ),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!interaction.member.roles.cache.has("875200644695355436")){
            return interaction.reply({content: 'Recurso disponivel somente para membros.',ephemeral: true})
        } 
        let cuidado = '```fix\n ⚠️AVISO: Qualquer um com essa chave tem acesso as salas de trainee```'
        const diretoria = interaction.options.getString('diretoria');
        const chave = db.get('chaves').find({diretoria: diretoria}).value().value
		const embed = new Discord.MessageEmbed()
		.setDescription(`**• Diretoria:** \`${diretoria}\` \n \n **• Chave de acesso:**  \`${chave}\` \n ${cuidado}`)
		.setColor(cor)
		await interaction.reply({embeds: [embed], ephemeral: true});
	},
	async run() {
		return
	}
};
	
