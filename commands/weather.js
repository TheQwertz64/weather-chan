module.exports = {
	name: 'weather',
	description: 'Tells the weather.',
	execute(message, args){
		message.reply({content:'I don\'t know the weather right now, sorry.'});
	},
};