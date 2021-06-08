require('dotenv').config();
const { readdirSync } = require('fs');
const { prefix } = require('./config.json');
const { Client, Collection } = require('discord.js');


const client = new Client();


client.on('ready', () => {
    console.log(`${client.user.username} is online <3`);

    client.user.setPresence({
        activity: {name:'meow',  type: 'PLAYING'},
        status:'idle',
    });
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./commands/');

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
//    if(command) command.run(client, message, args);

    if(command) {
        try {
            command.run(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an issue executing that command!');
        };
    }

});



client.login(process.env.TOKEN);
