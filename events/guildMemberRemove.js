module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute: async function(member,client) {
		try{
			const consoleServer = client.channels.cache.get("875211327726059570");
			if (!client.guilds.cache.some(guild => guild.members.cache.has(member.id))) {
				client.users.cache.delete(member.id);
			}
			consoleServer.send(`**${member.user.tag}** saiu do servidor **${member.guild}**`)
		}catch (err) {
			console.error(err)
		}
	}
}