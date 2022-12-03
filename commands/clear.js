module.exports = {
	name: 'clear',
	description: 'clears a set amount of messages',
	args: true,
	execute(message, args){
	const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply({content:'invalid number'});
		}
		else if (amount <= 1 || amount > 100){
			return message.send('number must be between 1 and 99');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error when deleting messages :worried:');
		});
	},
};