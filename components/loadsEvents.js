module.exports = (prefix,client) => {
const {readdirSync} = require('fs');
var response = ''
try{
    console.log(`✅ Sistemas online`);
    const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (activator) => event.execute(activator,client,prefix));
        } else if (event.name == 'voiceStateUpdate') {
            client.on(event.name, (oldMember, newMember) => event.execute(oldMember, newMember,client,prefix));
        }
        else{
            client.on(event.name, (activator) => event.execute(activator,client,prefix));
        }
    }
    response = '✅ Eventos carregados.'
}catch(err){
    console.log('❌ sistemas offline')
    response = '❌ Erro ao carregar os eventos: \n' + err.stack || err.message || err
}
    return console.log(response) 
}