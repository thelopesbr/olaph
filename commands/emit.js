

module.exports = {
    name: 'emit',
    aliases: ['e'],
	async run(message,args,client, cor , consoleServer , erro, dev, relatorio, terminal) {
        message.delete()
        const member = client.guilds.cache.get('875200644678570075').members.cache.get('895696647152099328')
        client.emit(args,member)

    }
}
