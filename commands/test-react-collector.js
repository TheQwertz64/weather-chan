module.exports = {
    name: 'test-react-collector',
    description: 'test the react collector functionality',
    async execute(message){
        const filter = (reaction,user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        };

        message.react('👍');

        message.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
	        .then(collected => console.log(collected.size))
	        .catch(collected => {
		        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
	        });
    }
}