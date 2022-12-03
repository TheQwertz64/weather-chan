module.exports = {
    name:'about',
    description: 'tells you more about weather-chan',
    aliases: '[weather-chan]',
    execute(message){
        const {Discord, AttachmentBuilder} = require('discord.js');
        const pfp = new AttachmentBuilder('../images/weather-chan.png');
        const weatherInfo = new Discord.MessageEmbed()
        .setColor('#05bafa')
        .setTitle('About Weather Chan')
        .setDescription('Weather Chan is a bot made by Alex Park in 2020, it was meant to give you real time weather based off your location, but that is kinda hard')
        .setImage('attachment://weather-chan.png');
        message.channel.send({embeds: [weatherInfo], files: [pfp]});
    },
};