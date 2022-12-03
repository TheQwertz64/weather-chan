module.exports = {
	name: 'ping',
	description: 'Pings the bot.',
	cooldown: 10,
	execute(message, args){
		message.channel.send('pong');
	},
};