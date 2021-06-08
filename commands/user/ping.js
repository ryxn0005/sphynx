const { MessageEmbed } = require('discord.js');
const { color, prefix } = require('../../config.json');

module.exports = {
    name: 'ping',
    description: `Get bot's ping`,
    aliases: ['latency'],
    category: 'user',
    run: async (client, message, args) => {

        await message.channel.send('Caculating...').then(sent => {
            const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Websocket heartbeat: \`${Math.round(client.ws.ping)}ms\` \nRoundtrip latency: \`${sent.createdTimestamp - message.createdTimestamp}ms\``);

            sent.edit(embed)
        });
    },
};