// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { dctoken, attoken } = require('./config.json');
const Airtable = require('airtable');

// Create a new Airtable instance
const base = new Airtable(
    {
        apiKey: attoken,
    }).base('appIYT3CuGvt50rYJ');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('guildMemberAdd', member => {
	console.log(`A member has joined with name ${member.displayName}`);
    base('All members').create([
  {
    'fields': {
      'User': member.user.username,
      'ID': parseInt(member.id),
      'Nickname': member.displayName,
    },
  },
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(records);
});
});

// Log in to Discord with your client's token
client.login(dctoken);