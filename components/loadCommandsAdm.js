const {readdirSync} = require('fs');

module.exports = (client) => {
    var response = ''
    try{
        const commands = readdirSync('./commands').filter(file => file.endsWith('.js'))
        if (commands.length < 1) return console.log('Comando nao encontrado');
        commands.forEach(f => {
            const pull = require(`../commands/${f}`)
            client.commands.set(pull.name, pull)
            pull.aliases.forEach(aliases => {
                client.aliases.set(aliases, pull)
            })
        
        })
        response = '✅ Comandos ADM carregados'
    }catch (err) {
        response = '❌ Erro ao carregar os comandos ADM: \n'+ err.stack || err.message || err
    }
    return  console.log(response)
}