module.exports = {
	name:'compliment',
	description: 'compliments a user',
	execute(message, args){
		if (!message.mentions.users.size) {
			return message.reply({content:'No user tagged.'});
		}
		const taggedUser = message.mentions.users.first();
		
		message.channel.send(`${taggedUser.username} is a nice person.`);
	},
};