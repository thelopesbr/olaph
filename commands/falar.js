
module.exports = {
    name: 'falar',
    aliases: ['diz','dizer'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!args || !message.member.roles.cache.has("878761418067963984"))return 
        message.delete()
        let mensagem = args.slice(1).join(' ')
        const canal = message.mentions.channels.first() || client.channels.cache.get(args[0]);
        if (message.member.roles.cache.has("878761418067963984")){
            canal.send(mensagem)
            consoleServer.send(` \`${mensagem}\` enviada para ${canal}`)
            
        }
        else{
            erro.setTitle('Você não tem permissão!');
            erro.setDescription('Você precisa do cargo de suporte.')
            message.channel.send({embeds: [erro]})
        }

    }
}
