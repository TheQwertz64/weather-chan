const {secret_value} = require('../config.json');

module.exports = {
	name: 'give-gamer',
	aliases: ['make-member'],
	description:'gives user the certified gamer role for entering the secret value',
	execute (message, args){

		if(!args.length) {
			return message.channel.send(`you need to include the secret value, ${message.author}`);
		}

		const attempt = args[0].toLowerCase();

		if(attempt != `${secret_value}`) {
			return message.reply({content:'That isn\'t the correct secret value'});
		}
		if (attempt === `${secret_value}`) {
			let member = message.member;
			let giveRole = message.guild.roles.cache.find(role => role.id == "538942346012786698")
			member.roles.add(giveRole);
			return message.channel.send(`Value accepted, ${message.author}, you are now a certified gamer!`);
		}
	},
};