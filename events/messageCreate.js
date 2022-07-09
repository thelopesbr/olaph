const Config = require("../components/config");
module.exports = {
	name: 'messageCreate',
	once: false,
	execute: async function(message,client,prefix) {
		try{
			const config = Config(client, message);
			const { cor , consoleServer , erro, suporte, relatorio, terminal} = config
			const thread = client.channels.cache.get(message.channelId).isThread();
			if (message.author.bot) return 
			if (message.channel.type == "DM"){
			   const link = message.channel.lastMessage.attachments.map(c => c.url)
			   const msg = `O membro **${message.author}** enviou um arquivo: \n ` + message.channel.lastMessage.content
				if(link.length == 1){ 
				  const arquivo = new MessageAttachment(link[0]) 
				  await consoleServer.send({content: msg, files: [arquivo] }) 
				}
				else{
					await consoleServer.send(`O membro **${message.author}** enviou no meu privado: \n \`${message.content}\` `)
				
				}
				return
			}
			
			const mention = message.mentions.members.first() || message.mentions.roles.first();
			if (mention && mention.id == client.user.id){
				await message.channel.send(`${message.author} Opa tranquilo? `);
				await consoleServer.send(`${suporte} \n ${message.author} mencionou o Olaph no canal ${message.channel}`)
				return
			}
			if(mention && mention.id == '878761418067963984'){
				const relatorio = new MessageEmbed()
				.setTitle(`${message.member.displayName} solicitou suporte`)
				.setColor(cor)
				.setDescription(`${message.author} Pediu suporte no canal ${message.channel} \n \n [Clique aqui](https://discord.com/channels/875200644678570075/${message.channelId}/${message.id}) Para acessar a mensagem `)
				.setTimestamp()
				.setThumbnail(message.member.user.displayAvatarURL())
				await message.react('⚙️')
				await consoleServer.send({content:`${mention}`,embeds: [relatorio]})
			}
			if(message.content.includes('Olaph') || message.content.includes('olaph') ){
				await message.react('👀')
				await consoleServer.send(`${message.author} falou sobre mim \n "${message.content}"`)
			}
		
			if(!message.content.startsWith(prefix))return
			
			if(message.channel.id != '875200644695355440' && message.channel.type != "DM" && !thread ){
				message.delete()
				const envio = await message.channel.send(`Vá para o canal ${terminal}`)
				setTimeout(() => envio.delete(), 5000) 
				return
			}
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
			const exec = client.commands.get(command) || client.aliases.get(command);
		
			if (!exec) return message.channel.send(`Comando \`${command}\` nao encontrado`)
			try {
				exec.run(message,args, client, cor , consoleServer , erro, suporte, relatorio, terminal)
			}
			catch(err) {
				erro.setDescription('Algo deu errado ao executar o comando ' + command + '\n Foi gerado um relatorio do erro e enviado aos meus desenvolvedores, pedimos desculpas pelo ocorrido :(' )
				relatorio.setTitle(`Relatorio gerado em nome de ${message.author.tag}`)
				relatorio.setDescription(`${message.author} \n ` + err.stack)
				await message.author.send(erro)
				await consoleServer.send(relatorio)
			}
			}
			catch (err) {
				console.error(err)
			}
    }
}