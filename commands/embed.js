module.exports = {
	name: 'embed',
	description: 'test embeds',
	cooldown: 10,
	execute(message, args){
		const Discord = require('discord.js');
		const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#6F9D44')
	.setTitle('Sample Embed')
	.setURL('https://www.youtube.com/watch?v=KhsOW-_TwfU')
	.setAuthor({name:'Alex Park', iconURL:'https://i.imgur.com/l7R00Rv.jpeg', url:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
	.setDescription('it\'s a picture of a pc')
	.setThumbnail('https://i.imgur.com/4XE4KwK.jpg')
	.addFields(
		{ name: 'extremely important info', value: 'i\'m an idiot ' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'stuff', value: 'pizza hut', inline: true },
		{ name: 'stuffed', value: 'crust pizza', inline: true },
	)
	.addField('poggers', 'poggers again', true)
	.setImage('https://cdn.discordapp.com/attachments/632344366110867479/725917570452160542/unknown.png')
	.setTimestamp()
	.setFooter({text:'reeee', iconURL: 'https://cdn.discordapp.com/attachments/561727579837562911/729823846223446097/1485952536_040486_1485953788_noticia_normal.jpg'});

	message.channel.send({embeds: [exampleEmbed] });
	},
};