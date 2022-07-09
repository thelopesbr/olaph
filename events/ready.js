const loadCommandsAdm = require("../components/loadCommandsAdm");
const loadCommandsPublic = require("../components/loadCommandsPublic");
const startInfo = require("../components/startInfo");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
            loadCommandsAdm(client);
            loadCommandsPublic(client);
            startInfo(client);
            const activity = [
                            {name: `@bytejr`},
                            {name: `www.bytejr.com.br`, url: "https://www.bytejr.com.br"},
                            {name: `Saesel`, type: 1, url: "https://www.twitch.tv/saesel"},
                            {name: `marechal_dev`, type: 1, url: "https://www.twitch.tv/marechal_dev"}
                        ] 
            setInterval(function() {
                let random = Math.floor(Math.random() * activity.length)
                client.user.setPresence({ activities: [activity[random]] })
            }, 15000);
	},
};



