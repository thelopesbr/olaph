const Discord = require('discord.js');
const data = (client) => {
    const Cor = '#47dd93';
    const servidor = client.guilds.cache.get('875200644678570075');
    const consoleServer = client.channels.cache.get("875211327726059570");
    const suporte = servidor.roles.cache.get('878761418067963984');
    const terminal = client.channels.cache.get('875200644695355440');
    const erro = new Discord.MessageEmbed()
    .setTitle('ERRO!')
    .setColor('#FF0000')
    .setThumbnail('https://cdn.discordapp.com/attachments/714573856613859339/789552509903044638/erro.png')
    .setTimestamp()
    .setFooter({text:'Byte Jr .',icon:'https://cdn.discordapp.com/attachments/875551615493472256/875553139326079036/Octagono---Versao-Principal.png'});
    
    const Relatorio = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setThumbnail('https://cdn.discordapp.com/attachments/714573856613859339/789552509903044638/erro.png')
    .setTimestamp()
    .setFooter({text:'Byte Jr .', icon:'https://cdn.discordapp.com/attachments/875551615493472256/875553139326079036/Octagono---Versao-Principal.png'});
    
    return {
        cor: Cor,
        consoleServer: consoleServer,
        erro: erro,
        suporte: suporte,
        relatorio: Relatorio,
        terminal: terminal,
        servidor: servidor
    };
}
    
module.exports = data