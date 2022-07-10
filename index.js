const {
  Client,
  Collection,
  MessageEmbed,
  MessageAttachment,
  Intents,
} = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const database = require("./components/database.js");
const loadsEvents = require("./components/loadsEvents.js");
const { prefix, token } = require("./config/config.json");

client.commands = new Collection();
client.aliases = new Collection();

loadsEvents(prefix, client);
database.connect();

client.login(token);
