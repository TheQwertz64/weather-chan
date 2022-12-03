module.exports = {
	name: 'ban',
	description: 'bans someone from the server',
	args: true,
	usage: '<user>',
	execute(message, args){
		const Discord = require('discord.js');
		if (!message.mentions.users.size) {
			return message.reply({content:'you need to tag a user in order to ban them!'});
		}
		if(message.member.roles.cache.has('538937873513185291')) {
			const taggedUser = message.mentions.users.first();
			message.channel.send(`${taggedUser.username} was banned.`);
			taggedUserId = message.guild.members.cache.get(taggedUser.id);
			taggedUserId.ban();
		}
		else{
			message.channel.send ('You don\'t have permission to use this command');
		}
	},
};