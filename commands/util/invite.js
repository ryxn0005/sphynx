const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
    name: 'invite',
    description: `Get bot's invitation link`,
    aliases: ['i'],
    category: 'user',
    run: (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('https://discord.com/api/oauth2/authorize?client_id=851459220226179142&permissions=8&scope=bot');

        message.channel.send(embed)
    },
};