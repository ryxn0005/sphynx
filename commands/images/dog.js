const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json');

const dognoise = [
    "woof, woof",
    "ruff, ruff",
    'arf, arf'
]


const dog = Math.floor(Math.random() * dognoise.length)

module.exports = {
    name: "dog",
    category: "animals",
    run: async (client, message, args) => {
        const url = "https://some-random-api.ml/img/dog";

        let image, response;
        try {
            response = await axios.get(url);
            image = response.data;

        } catch (e) {
            return message.channel.send(`An error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${dognoise[dog].toUpperCase()}!!!`)
            .setColor(color)
            .setImage(image.link)

        await message.channel.send(embed)
    }
}