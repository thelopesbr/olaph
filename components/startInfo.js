
module.exports = async (client) => {
    var response = ''
    try{
        const EmbedInfo = require('../components/info');
        const embedInfo = EmbedInfo(client, '#47dd93');
        const msg = await client.channels.cache.get('875200645626478605').messages.fetch('972317313825120307');
        msg.edit({embeds: [embedInfo]});
        response = '✅ Painel de informações atualizado.'
    }catch(err) {
        response = '❌ Erro ao carregar o painel de informações: \n' + err.stack || err.message || err
    }
    return console.log(response)
}