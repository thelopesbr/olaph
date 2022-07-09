const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'regras',
    aliases: ['r'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!args || !message.member.roles.cache.has("878761418067963984"))return 
        message.delete()
        const servidor = client.guilds.cache.get('875200644678570075');
        const canal = message.mentions.channels.first()
        const regras = new MessageEmbed()
        .setTitle(`📃 Regras do servidor **${servidor.name}**`)
        .setDescription('Leia atentamente nossas regras')
        .setColor(cor)
        .addField('﻿','[1] Aqui é um servidor para todo tipo de pessoa, portanto respeite o jeito de cada um.')
        .addField('﻿','[2] Proibido postar de uma forma repetida (spam) ou em sequência (flood). (Essa regra é aplicada para palavras, emoji ou imagens).')
        .addField('﻿','[3] Cada canal tem sua singularidade então RESPEITE!')
        .addField('﻿','[4] Nada de conteúdo adulto ou obsceno. Isso inclui texto, imagens ou links que contenham nudez, sexo, violência pesada ou conteúdo graficamente perturbador.')
        .addField('﻿','[5] Proibido divulgar links e servidores nos canais ou no DM dos usuários.')
        .setThumbnail(servidor.iconURL())
        .setImage('https://cdn.discordapp.com/attachments/875551615493472256/885323141952446474/MOB_-_Regras_do_servidor.png')
        canal.send({embeds: [regras]})
        

    }
}
