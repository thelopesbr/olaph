const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {token }= require("../config/config.json");
const {readdirSync} = require('fs');

const clientId = '743659138546008064';
const guildId = '875200644678570075';
var response
module.exports = async (client) => {
    try{
        const commands = []
        const commandFiles = readdirSync('./commands/integrado').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/integrado/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command)
        }
        
        const rest = new REST({ version: '9' }).setToken(token);
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
                response = '✅ Comandos integrados carregados.'
            } catch (err) {
                response = '❌ Erro ao carregar os comandos integrados: \n'+ err.stack || err.message || err
            }
            
    }catch (err) {
            response = '❌ Erro ao carregar os comandos integrados: \n'+ err.stack || err.message || err
    }
    console.log(response)
}
