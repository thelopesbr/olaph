const {MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('consultoria')
		.setDescription('Sistema de consultoria formado por Ex membros'),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        const embed = new MessageEmbed()
        .setTitle('• Sistema de consultoria')
		.setDescription(`Se você é ex membro da Byte Jr, venha fazer parte da nossa equipe de consultoria do Servidor Discord, onde você terá acesso a todas as salas, estando por dentro de tudo o que acontece por aqui, afim de ajudar a empresa em seus desafios.`)
		.setColor(cor)
        .setImage('https://cdn.discordapp.com/attachments/875551615493472256/882768077085880360/MOB_-_Sistemas_de_Consultoria.gif')
        .setFooter({text: 'A consultoria é focada no servidor do discord e não é valida fora dele.'})
        const confirm = new MessageEmbed()
        .setTitle('• Sistema de consultoria')
        .setColor(cor)
        .setImage('https://cdn.discordapp.com/attachments/875551615493472256/882768077085880360/MOB_-_Sistemas_de_Consultoria.gif')
        .setFooter({text:'A consultoria é focada no servidor do discord e não é valida fora dele.'})
        const inscrever = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('inscrever')
            .setLabel('Inscrever')
            .setStyle('SUCCESS'),
            new MessageButton()
            .setCustomId('cancelar')
            .setLabel('cancelar')
            .setStyle('DANGER'),
        )
        
        if(!interaction.member.roles.cache.has('875200644695355434')){
            inscrever.components[0].disabled = true
        }
        if(!interaction.member.roles.cache.has('878749031793320008')){
            inscrever.components[1].disabled = true
        }
        else{
            inscrever.components[0].disabled = true
        }
		await interaction.reply({embeds: [embed], components: [inscrever], ephemeral: true});
        const filter = (i) => i.customId == 'inscrever' || i.customId === 'cancelar';
        const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000});
        collector.on('collect', async i => {
            if(i.customId == 'inscrever'){
                i.member.roles.add('878749031793320008');
                confirm.setDescription('Bem vindo a nossa equipe de consultoria 😃')
                i.update({embeds: [confirm], components: [], ephemeral: true })
            }
            if(i.customId == 'cancelar'){
                i.member.roles.remove('878749031793320008');
                confirm.setDescription('Obrigado por ter feito parte de nossa consultoria, até um proximo momento! 😉')
                i.update({embeds: [confirm], components: [], ephemeral: true })
            }
        });
        collector.on('end', async i => {
            const sessao = new MessageEmbed().setTitle('Sessão expirou!').setColor('#FF0000')
            interaction.editReply({embeds: [sessao], components: [], ephemeral: true} )
        })
	},
	async run() {
		return 
	}
};
	
