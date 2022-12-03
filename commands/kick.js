module.exports = {
	name: 'kick',
	description: 'kicks some scrub',
	guildOnly: true,
	args: true,
	usage: '<user>',
	execute(message, args){
		const Discord = require('discord.js');
		if (!message.mentions.users.size) {
			return message.reply({content:'you need to tag a user in order to kick them!'});
		}
		if(message.member.roles.cache.has('538937873513185291')) {
			const taggedUser = message.mentions.users.first();
			message.channel.send(`${taggedUser.username} was kicked.`);
			taggedUserId = message.guild.members.cache.get(taggedUser.id);
			taggedUserId.kick();
		}
		else{
			message.channel.send ('You don\'t have permission to use this command');
		}
	},
};