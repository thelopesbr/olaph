
module.exports = {
    name: 'privado',
    aliases: ['private'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!message.member.roles.cache.has("878761418067963984"))return
        message.delete()
        const membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const mensagem = args.slice(1).join(' ');
        
        try{
            await membro.send({content: mensagem})
            await message.author.send(`||${mensagem}|| \n \n :white_check_mark: mensagem enviada com sucesso para ${membro}!`)
        }
        catch{
            erro.setDescription('Não foi possivel enviar a mensagem')
            await message.author.send(erro);
        }
    }
}
