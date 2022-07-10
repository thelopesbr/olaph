

module.exports = {
    name: 'emit',
    aliases: ['e'],
	async run(message,args,client) {
        message.delete()
        const member = client.guilds.cache.get('875200644678570075').members.cache.get('334359138110799872')
        client.emit(args,member)

    }
}
