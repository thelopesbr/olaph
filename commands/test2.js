
module.exports = {
    name: 't2',
    aliases: ['t2'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
        
        const filter = m => m.content.includes('discord');
        const collector = message.channel.createMessageCollector({ filter, time: 15_000 });
        collector.on('collect', m => console.log(`Collected ${m.content}`));
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}




