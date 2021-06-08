const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');
const superagent = require('superagent');

const catnoise = [
    'meo',
    'muwaa',
    'meong',
    'miyu',
    'meow',
    'mèu',
    'miaau',
    'miaou',
    'miau',
    'miauw',
    'miao',
    'miaow',
    'miao',
    'miyav',
    'miav',
    'mjau',
    'miyau',
    'mao'
];

const cat = Math.floor(Math.random() * catnoise.length);

module.exports = {
    name: 'cat',
    description: `Generate a catpic`,
    aliases: ['cats', 'kitten', 'kittens'],
    category: 'animal',
    run: async (client, message, args) => {

        const {body} = await superagent.get('http://aws.random.cat/meow');
        if(!{body}) return message.reply('An error occurred, please try again!');

        const embed = new MessageEmbed()
        .setColor(color)
        .setImage(body.file)
        .setTitle(`${catnoise[cat]}!!!`)

        await message.channel.send(embed);
    },
};