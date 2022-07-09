
module.exports = {
    name: 't',
    aliases: ['t'],
	async run(message,args,client, cor , consoleServer , erro, suporte, relatorio, terminal) {
       // Await !vote messages
        const filter = m => m.content.startsWith('vote');
        // Errors: ['time'] treats ending because of the time limit as an error
        message.channel.awaitMessages({ filter, max: 4, time: 60_000, errors: ['time'] })
        .then(collected => console.log(collected.size))
        .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
    }
}




