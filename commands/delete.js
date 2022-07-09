
module.exports = {
    name: 'deletar',
    aliases: ['del'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!message.member.roles.cache.has("878761418067963984"))return
        message.delete()
        const qt = args[1];
        const canal = message.mentions.channels.first() || client.channels.cache.get(args[0]);
        if(!qt || !canal){
            erro.setDescription('Não me informou os dados necessarios para essa ação!')
            const envio = await message.channel.send({embeds: [erro]})
            setTimeout(()=> envio.delete(),3000)
          }
        else{
          try{
            setTimeout(() => {canal.bulkDelete(qt);}, 500);
          }
          catch{
            erro.setDescription('Erro ao deletar mensagem')
            await message.author.send(erro)
          }
        }
    }
}
