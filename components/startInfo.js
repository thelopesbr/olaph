
module.exports = async (client) => {
    var response = ''
    try{
        const EmbedInfo = require('../components/info');
        const embedInfo = EmbedInfo(client, '#47dd93');
        const msg = await client.channels.cache.get('875200645626478605').messages.fetch('950932887878926346');
        msg.edit({embeds: [embedInfo]});
        response = '✅ Painel de informações atualizado.'
    }catch(err) {
        response = '❌ Erro encontrado: \n' + err.stack || err.message || err
    }
    return console.log(response)
}