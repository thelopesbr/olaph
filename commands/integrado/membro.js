const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('membro')
		.setDescription('Comando para efetivar ou desligar um membro')
        .addStringOption(option =>
            option.setName('ação')
                .setDescription('Ação no qual quer aplicar ao membro (efetivar/desligar)')
                .setRequired(true)
                .addChoices(
                    {name: 'Efetivar', value: 'efetivar'},
                    {name: 'Desligar', value: 'desligar'},
                )
                
            )
        .addUserOption(option =>
            option.setName('membro')
                .setDescription('Membro no qual quer efetivar/desligar')
                .setRequired(true)
                 )
        .addRoleOption(option =>
            option.setName('diretoria')
                .setDescription('Diretoria principal do membro (valido somente para efetivar um membro)')
                .setRequired(false)
                ),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!interaction.member.roles.cache.has("878761418067963984")){
            return interaction.reply({content: 'Você precisa ser da equipe de suporte para executar esse comando.', ephemeral: true})
        }
        const açao = interaction.options.getString('ação');
        const membro = interaction.guild.members.cache.get(interaction.options.getMember('membro').id);
        const diretoria = interaction.options.getRole('diretoria');
        const embed = new Discord.MessageEmbed()
		.setColor(cor)
        .setTimestamp()
      
        if(açao == 'efetivar'){
            if(diretoria){
                membro.roles.set(['875200644695355436',diretoria.id]);
                embed.setDescription(`${membro} efetivado com sucesso!`);
            }
            else{
                embed.setColor('#FF0000')
                embed.setDescription(`Você tentou efetivar um membro, para isso precisa informar a diretoria dele.`);
            }
        }
        else{
            membro.roles.set(['875200644695355434']);  
            embed.setDescription(`${membro} desligado com sucesso!`);
        }
		await membro.send('🎉 **Parabéns! Você foi efetivado como membro da Byte Jr. Seja Bem vindo!** ')
		await interaction.reply({embeds: [embed], ephemeral: true});
	},
	async run() {return}
};
	
