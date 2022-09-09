const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/cursos.json');
const db = low(adapter);
const {MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

let trava 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plataformas')
		.setDescription('Sistemas de controle de acessos as plataformas de cursos.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('cursos')
                .setDescription('Acessa um curso'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('relatorio')
                .setDescription('Envia quem acessou as plataformas de cursos')
                .addStringOption(option =>
                    option.setName('mes')
                        .setDescription('Mes no qual quer receber o relatorio')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Janeiro', value: 'Janeiro'},
                            {name: 'Fevereiro', value: 'Fevereiro'},
                            {name: 'Março', value: 'Março'},
                            {name: 'Abril', value: 'Abril'},
                            {name: 'Maio', value: 'Maio'},
                            {name: 'Junho', value: 'Junho'},
                            {name: 'Julho', value: 'Julho'},
                            {name: 'Agosto', value: 'Agosto'},
                            {name: 'Setembro', value: 'Setembro'},
                            {name: 'Outubro', value: 'Outubro'},
                            {name: 'Novembro', value: 'Novembro'},
                            {name: 'Dezembro', value: 'Dezembro'},
                        )
                
                    ),
                ),
	async execute(interaction,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!interaction.member.roles.cache.has("875200644695355436")){
            return interaction.reply({content: 'Recurso disponivel somente para membros.', ephemeral: true})
        } 
        if(trava) return interaction.reply({content: `Espere um pouco, o sistema está sendo usado no momento!`, ephemeral: true})
        trava = true
        const data = new Date()
        const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
        const mes = meses[data.getMonth()]
        data.setHours(parseInt(data.getHours() - 3))
        let hora = ""
        if(data.getHours() < 10){
            hora = '0'+ data.getHours() + ':' + data.getMinutes()
        }
        else{
            hora = data.getHours() + ':' + data.getMinutes()
        }


        const day = data.getDate()
        const alura = db.get('alura');
        const b7 = db.get('b7');
        const origamid = db.get('origamid');
        const adm = db.get('adm');

        const tabela = new MessageEmbed()
            .setTitle("<a:globo:813455999847366687> Plataformas de cursos")
            .setColor(cor)
            .setDescription(
        `:white_small_square: [ALURA](https://www.alura.com.br)         ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿${alura.value().status}   ${alura.value().author}    ${alura.value().inicio} ${alura.value().dia} \n \n`+
        `:white_small_square: [B7](https://alunos.b7web.com.br/login)   ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿${b7.value().status}   ${b7.value().author}      ${b7.value().inicio} ${b7.value().dia} \n \n` +
        `:white_small_square: [ORIGAMID](https://www.origamid.com)      ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿${origamid.value().status}  ${origamid.value().author}      ${origamid.value().inicio} ${origamid.value().dia} \n \n `+
        `:white_small_square: [ADM](http://adm-university.paginas.digital/login)  ﻿ ﻿  ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿ ﻿${adm.value().status}  ${adm.value().author}      ${adm.value().inicio} ${adm.value().dia}`   
        )
            .setThumbnail('https://cdn.discordapp.com/attachments/777909174453141525/814168340423114873/Logo---Versao-Responsiva.png')
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/875551615493472256/881749001291042877/Venha_se_desenvolver_com_a_Byte.gif')
        const cursoButton = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Plataformas')
					.addOptions([
						{
							label: 'Alura',
							value: 'alura',
						},
						{
							label: 'B7',
							value: 'b7',
						},
                        {
							label: 'Origamid',
							value: 'origamid',
						},
                        {
							label: 'Adm University',
							value: 'adm',
						},
					]),
            )
        const force = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('force')
                .setLabel('Force')
                .setStyle('SECONDARY'),
            )
        if(interaction.options._subcommand == 'cursos'){
            interaction.reply({embeds:[tabela], components: [cursoButton], ephemeral: true});
        
            const filter = (i) => i.customId == 'select' || i.customId === 'force';
            const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000});
            const forceActive = []

            collector.on('collect', async i => {
            const confirm = new MessageEmbed().setColor(cor);
            
            if (i.customId === 'select') {
                const plataforma = db.get(i.values[0]);
                forceActive.push(plataforma)
                let time = parseInt(plataforma.value().inicio.substr(0, 2))
                let timeM = parseInt(plataforma.value().inicio.substr(3,2)) 
                time = parseInt(data.getHours()) - time
                timeM = parseInt(data.getMinutes()) - timeM
                if(timeM < 0){
                    time = time -= 1
                    timeM = timeM + 60
                }
                if(day != plataforma.value().dia){
                    plataforma.assign({ativo: false},{author: ""},{inicio: ""},{authorID: ""}, {dia:""},{status:"Disponivel"}).write()
                }
                if(plataforma.value().ativo){
                    if(plataforma.value().authorID == i.member.id){
                        plataforma.assign({ativo: false},{author: ""},{inicio: ""},{authorID: ""}, {dia:""},{status:"Disponivel"}).write()
                        confirm.setTitle(`${plataforma.value().name} foi desativada`)
                        i.update({embeds:[confirm], components: [], ephemeral: true})

                    }
                    else{
                        confirm.setTitle(`${plataforma.value().name} está em uso!`)
                        confirm.setDescription(`**Author:** ${plataforma.value().author} \n **Inicio:** ${plataforma.value().inicio} \n **Ativo**: ${time} horas e ${timeM} minutos.`)
                        confirm.setColor('#FF0000')
                        timeM = timeM / 60 
                        time = time + timeM
                        if(time >= 2){
                            force.components[0].disabled = false
                        }
                        else{
                            force.components[0].disabled = true
                        }
                        
                        i.update({embeds:[confirm], components: [force]})
                    }
                    return
                }


                const colaboradores = db.get('colaboradores').value()[mes]
                if(!colaboradores.includes(interaction.member.displayName)){
                    colaboradores.push(interaction.member.displayName)
                    await db.get('colaboradores').assign({[mes] : colaboradores})

                  }

                if(i.values[0] == 'alura'){
                    let cuidado = '```fix\n ⚠️AVISO: A mensalidade da Alura não foi paga! Estamos sem acesso.```'
                    alura.assign({ativo: true},{status: "Ocupado"},{author: i.member.displayName},{authorID: i.member.id},{inicio: hora}, {dia:day}).write()
                    confirm.setTitle(`Alura ativada com sucesso!`)
                    confirm.setDescription(`**Email:** contato@bytejr.com \n **Senha:** bytejr.X8 \n \n [• Acessar](https://www.alura.com.br) \n \n ${cuidado}`)
                    i.update({embeds:[confirm], components: [], ephemeral: true})
                }
                else if(i.values[0] == 'b7'){
                    b7.assign({ativo: true},{status: "Ocupado"},{author: i.member.displayName},{authorID: i.member.id},{inicio: hora}, {dia:day}).write()
                    confirm.setTitle(`B7 ativada com sucesso!`)
                    confirm.setDescription('**Email:** contato@bytejr.com \n **Senha:** contato@bytejr.com \n \n [• Acessar](https://alunos.b7web.com.br/login)')
                    i.update({embeds:[confirm], components: [], ephemeral: true})
                }
                else if(i.values[0] == 'origamid'){
                    origamid.assign({ativo: true},{status: "Ocupado"},{author: i.member.displayName},{authorID: i.member.id},{inicio: hora}, {dia:day}).write()
                    confirm.setTitle(`Origamid ativada com sucesso!`)
                    confirm.setDescription('**Usuario:** byte.jr \n **Senha:** bytejr.X8 \n \n  [• Acessar](https://www.origamid.com) ')
                    i.update({embeds:[confirm], components: [], ephemeral: true})
                }
                else{
                    adm.assign({ativo: true},{status: "Ocupado"},{author: i.member.displayName},{authorID: i.member.id},{inicio: hora}, {dia:day}).write()
                    confirm.setTitle(`Adm University ativada com sucesso!`)
                    confirm.setDescription('**Email:** bytejr@email.com \n **Senha:** bytejr.X8 \n \n \n [• Acessar](http://adm-university.paginas.digital/login) ')
                    i.update({embeds:[confirm], components: [], ephemeral: true})
                }
            }
            if(i.customId == 'force'){
                confirm.setTitle(`${forceActive[0].value().name} ativada com sucesso!`);
                const member = client.guilds.cache.get('875200644678570075').members.cache.get(forceActive[0].value().authorID);

                forceActive[0].assign({ativo: true},{status: "Ocupado"},{author: i.member.displayName},{authorID: i.member.id},{inicio: hora}, {dia:day}).write()
                
                i.update({embeds:[confirm], components: [], ephemeral: true})
                member.send(`${interaction.member} pegou seu acesso a ${forceActive[0].value().name} por está em seu nome a mais de 2 horas.`)
            }
            })
            collector.on('end', async i => {
           trava = false
           const sessao = new MessageEmbed().setTitle('Sessão expirou!').setColor('#FF0000')
           interaction.editReply({embeds: [sessao], components: [], ephemeral: true} )
            })
        }
        else{
            trava = false
            const mes = interaction.options.getString('mes');
		    const colaboradores = db.get('colaboradores').value()[mes]
		    let texto = colaboradores.toString()
            let lista = texto.replace(/,/g, "\n :white_small_square: ")
		    const relatorioEmbed = new MessageEmbed()
		    .setTitle(`🧾 Relatorio de ${mes}`)
		    .setDescription(`:white_small_square: ${lista}`)
		    .setColor(cor)
		    await interaction.reply({embeds: [relatorioEmbed], ephemeral: true});
        }
    },
    async run(){
        return
    }
};