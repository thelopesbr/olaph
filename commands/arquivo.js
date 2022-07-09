const {MessageAttachment} = require('discord.js');
module.exports = {
    name: 'arquivo',
    aliases: ['arq'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        if(!args || !message.member.roles.cache.has("878761418067963984"))return;
        message.delete();

        const destino = client.channels.cache.get(args[0]) || message.mentions.channels.first() ||message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const envio = await message.channel.send('Envie o arquivo')
        const cap = setInterval(() => {
        const arquivoInput = message.channel.lastMessage.attachments
        const arquivoOuput = arquivoInput.map(name => name.url)

        if(arquivoOuput[0]){
          const arquivo = new MessageAttachment(arquivoOuput[0])
          destino.send({files: [arquivo] })
          message.channel.bulkDelete(1)
          envio.edit('✅ arquivo enviado')
          clearInterval(cap)
        }
        
      },1000)
      setTimeout(() => {
        if(cap._destroyed == false){
          envio.edit(':x: Tempo expirado')
          clearInterval(cap)
                                  } 
        },30000)

    }
}

