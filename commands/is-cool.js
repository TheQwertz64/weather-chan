module.exports = {
	name: 'is-cool',
	cooldown: 5,
	description: 'Tells you whether something is cool or not',
	args: true,
	execute(message, args){
		if (args[0].toLowerCase() === 'fortnite') {
			return message.channel.send('fortnite is trash.');
		}
		else if(args[0].toLowerCase() === 'anime'){
			return message.channel.send('That is hella lame.')
		}
		message.channel.send(`${args[0]} is very cool :sunglasses:`);
	},
};