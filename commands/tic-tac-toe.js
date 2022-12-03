module.exports = {
    name: 'tic-tac-toe',
    description: 'play a fun tic-tac-toe game.',
    wip: true,
    execute(message, args){
        const taggedUser = message.mentions.users.first();
        if (taggedUser === undefined) {
            message.channel.send('You didn\'t define an opponent');
        }
        message.channel.send(`${message.author} challenged ${taggedUser} to a game of tic-tac-toe.`)
        message.channel.send(`${taggedUser} gets the first move, please react to the next message with a number 1-9 representing your move. (numbering starts from the bottom left and moves right, then up starting from the left again.)`);
        message.channel.send(':white_square_button::white_square_button::white_square_button: \n:white_square_button::white_square_button::white_square_button: \n:white_square_button::white_square_button::white_square_button: ');
        const filter = (reaction , user) => {
            return reaction.emoji.name === ':one:' && user.id === message.author.id;
        };
        const filterTwo = (reaction, user) => {
            return reaction.emoji.name === ':one:' && user.id === taggedUser.id;
        }
        
        //const collector = message.createReactionCollector(filter, { time: 30000 });
        
        message.awaitReactions({filter, max: 1, time: 30000, errors: ['time'] })
	        .then(collected => console.log(collected.size))
	        .catch(collected => {
		        console.log(`After 30 secs, only ${collected.size} reacted.`);
	        });

        //collector.on('collect', (reaction, user) => {
        //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        //});
        
        //collector.on('end', collected => {
        //    console.log(`Collected ${collected.size} items`);
        //});
    }

}