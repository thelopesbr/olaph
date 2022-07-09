const { MessageEmbed } = require('discord.js');

module.exports = (client, cor) =>{
    const regras =  client.channels.cache.get('875200645626478604');
    const avisos = client.channels.cache.get('877884383472795648');
    const comandos = client.channels.cache.get('875200644695355440');
    const servidor = client.guilds.cache.get('875200644678570075');

    let membros =servidor.members.cache.filter(member => member.roles.cache.has('875200644695355436') && member.user.bot == false).size;
    let exmembro =servidor.members.cache.filter(member => member.roles.cache.has('875200644695355434') && member.user.bot == false).size;
    let presidencia =servidor.members.cache.filter(member => member.roles.cache.has('875200644695355435') && member.user.bot == false).size;
    let gp =servidor.members.cache.filter(member => member.roles.cache.has('875200644678570084') && member.user.bot == false).size;
    let projetos =servidor.members.cache.filter(member => member.roles.cache.has('875200644695355432') && member.user.bot == false).size;
    let adm =servidor.members.cache.filter(member => member.roles.cache.has('875200644678570083') && member.user.bot == false).size;
    let negocios =servidor.members.cache.filter(member => member.roles.cache.has('875200644678570082') && member.user.bot == false).size;
    let trainee =servidor.members.cache.filter(member => member.roles.cache.has('875200644678570079') && member.user.bot == false).size;
    let consultoria =servidor.members.cache.filter(member => member.roles.cache.has('878749031793320008') && member.user.bot == false).size;
    let visitantes = servidor.members.cache.filter(member => member.roles.cache.has('875200644678570076') && member.user.bot == false).size;
    let bot = servidor.members.cache.filter(member => member.user.bot).size;
    let usuarios =servidor.memberCount - bot;
    let canaistexto =servidor.channels.cache.filter(a => a.type === "GUILD_TEXT").size;
    let canaisvoz =servidor.channels.cache.filter(a => a.type === "GUILD_VOICE").size;

    const embed = new MessageEmbed()
        .setTitle(`Informacoes do servidor **${servidor.name}**`)
        .setColor(cor)
        .setThumbnail(servidor.iconURL())
        .addField('• Atual responsavel do servidor:', `<@${servidor.ownerId}>`)
        .addField('• Criado em:', 'quarta-feira, 11 de agosto de 2021 às 23:14')
        .addField("• ID:", servidor.id)
        .addField('﻿',`${regras} ﻿ | ﻿ ${avisos} ﻿ | ﻿ ${comandos}`)
        .addField('﻿','﻿')
        .addField(`• Membros [${membros}]`, `Presidência: ${presidencia}\n Projetos: ${projetos} \n Gestão de Pessoas: ${gp}\n Adm. Financeiro: ${adm}\n Negócios: ${negocios}\n Trainee: ${trainee}\n Ex-Membro: ${exmembro}\n Consultoria: ${consultoria}\n Visitantes: ${visitantes}\n Bots: ${bot}\n Usuarios: ${usuarios} \n \n \n :white_small_square:   https://discord.gg/74ndRsT2zZ`, true)
        .addField(`• Canais [${canaistexto+canaisvoz}]`, `💬 Texto: ${canaistexto}\n 🎧 Voz: ${canaisvoz}`, true)
        .addField(`﻿`,'[<:bytejr:877660498437496882>](https://www.bytejr.com.br)﻿ ﻿ ﻿ ﻿ ﻿ ﻿[<:instagram:877556801195900998>](https://www.instagram.com/bytejr/)﻿ ﻿ ﻿ ﻿ ﻿ ﻿[<:facebook:877554936450269184>](https://www.facebook.com/bytejr)﻿ ﻿ ﻿ ﻿ ﻿ ﻿[<:linkedin:877554936353816656>](https://www.linkedin.com/company/bytejr/)',false)
    
    return embed


 }