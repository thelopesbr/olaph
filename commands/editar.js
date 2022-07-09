
module.exports = {
    name: 'editar',
    aliases: ['edit'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!args || !message.member.roles.cache.has("878761418067963984"))return 
        message.delete();
        const canal = message.mentions.channels.first() || client.channels.cache.get(args[0]);
        const msg = await canal.messages.fetch(args[1])
        let msgNew = args.slice(2).join(' ');
        
        msg.edit(msgNew);
        consoleServer.send(`<**${msg.content}**> Foi editada para <**${msgNew}**>`)
  
        
        
    }
}
