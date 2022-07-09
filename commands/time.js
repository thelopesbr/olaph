
module.exports = {
    name: 'time',
    aliases: ['programar', 'agendar'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        
        if(!message.member.roles.cache.has("878761418067963984") || !args)return
        message.delete()
        let time = args[0]
        let tempo = time * 1000 * 60
        let mensagem = args.slice(2).join(' ')
        const canal = message.mentions.channels.first() || client.channels.cache.get(args[1])
        try{
            await consoleServer.send(`:clock2: Sera enviado **${mensagem}** no canal ${canal} daqui a ${time} minutos.`)
            setTimeout(()=> canal.send(mensagem),tempo)
        }
        catch{
            erro.setDescription('Não foi possivel enviar a mensagem')
            await message.author.send(erro);
        }
    }
}
