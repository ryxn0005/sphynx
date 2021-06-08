const { MessageEmbed } = require('discord.js');
const { prefix, color } = require('../../config.json');
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['h', 'cmd', 'commands'],
    category: 'user',
    usage: `${prefix}help [cmd name]`,
    run: async (client, message, args) => {
        if(!args[0]) return getAll(client, message);
        return cmdInfo(client, message, args[0]);
    },
};

async function getAll(client, message) {
    let categories = [];
    
    readdirSync('./commands/').forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
            let file = require(`../../commands/${dir}/${command}`);

            if(!file.name) return;

            let name = file.name.replace(".js","");

            return `\`${name}\``;
        }); 

        let data = new Object();

        data = {
            name: dir.toUpperCase(),
            value: cmds.join(', '),
        };

        categories.push(data)
    });

    const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(`Hi! I'm ${client.user.username}!`, client.user.displayAvatarURL())
    .addFields(categories)
    .setDescription(`Here is the list of commands! \nFor more info on a specific command, use ${prefix}help <command> \nContact feliks#4930 if you need help.`)
    

    return await message.author.send(embed)
    .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply('I\'ve sent you a DM with all my commands!');
    })
    .catch(error => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
    });

};

function cmdInfo(client, message, input) {
    const embed = new MessageEmbed().setColor(color);
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())));
    let info = `Command not found!`

    if(!cmd) return message.reply(info);

    if(cmd.name) info = `**Command name:** ${cmd.name}`;
    if(cmd.aliases) info += `\n**Alias(es):** ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if(cmd.description) info += `\n**Description:** ${cmd.description}`;
    if(cmd.usage) {
        info += `\n**Usage:** ${cmd.usage}`;

        embed.setFooter('<> = obligatory, [] = optional.');
    };


    return message.author.send(embed.setDescription(info))
    .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply(`I've sent you a DM with that command's description.`);
    })
    .catch(error => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
    });

};