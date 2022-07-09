const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/chaves.json');
const db = low(adapter);
const {MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('trainee')
		.setDescription('Se registrar como trainee')
        .addStringOption(option =>
            option.setName('chave')
                .setDescription('Digite a chave de acesso fornecida pelo seu Diretor')
                .setRequired(true)),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        const confirm = new MessageEmbed()
        .setTitle('• Sistema de trainee')
		.setColor(cor)
        const chave = interaction.options.getString('chave');
        const chaveValidada = db.get('chaves').find({value: chave}).value();

        if(!chaveValidada)return interaction.reply({embeds: [confirm.setDescription('Chave Invalida').setColor('#ff0000')], ephemeral: true})
        if(interaction.member.roles.cache.has('875200644678570079'))return interaction.reply({embeds: [confirm.setDescription('Você já está registrado')], ephemeral: true})
    
        if(chaveValidada.diretoria == 'Projetos'){
            interaction.member.roles.set(['875200644678570079','875200644695355432']);
        }
        else if(chaveValidada.diretoria == 'Gestão de Pessoas'){
            interaction.member.roles.set(['875200644678570079','875200644678570084'])
        }
        else if(chaveValidada.diretoria == 'Adm. Financeiro'){
            interaction.member.roles.set(['875200644678570079','875200644678570083'])
        }
        else{
            interaction.member.roles.set(['875200644678570079','875200644678570082'])
        }
        confirm.setDescription(`Bem vindo ao trainee de ${chaveValidada.diretoria} 😃`)
        interaction.reply({embeds: [confirm.setThumbnail('https://cdn.discordapp.com/attachments/714573856613859339/814543708997025822/boneco.gif')], ephemeral: true})
	},
	async run() {
		return 
	}
};
	
