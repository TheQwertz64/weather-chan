module.exports = {
    name: 'hangman',
    description: 'play a fun hangman game',
    wip: true,
    execute (message, args){
       message.author.send(`Please tell me the word for this hangman game, ${message.author}.`);
        const filter = m => m.content.includes('') && m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({filter, max: 1, time: 15000})
        const filterTwo = m => m.content.length === 1 && !message.author.bot;
        //const collectorTwo = message.channel.createMessageCollector(filterTwo, {max: 1, time: 15000})
        

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
            var hangWord = (`${m.content}`);
            message.channel.send(`${message.author} has started a game of hangman, the word is ${hangWord.length} letters long, guessers have 6 chances`);
        })
                
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            if(collected.size === 0){
                message.channel.send(`${message.author} failed to send a message in time.`);
                return ('');
            }
        });

        
            var hangWord = 'rock';
            var badGuesses = [];
            var corrects = [];
            for(i = 0; i < hangWord.length; i++){
                corrects.push('nulll');
            }
            var hangSplit = hangWord.split('');
            console.log(`${hangSplit}`)
            for(t = 0; t < 26; t++){    
                message.channel.awaitMessages(filterTwo, {max: 1, time: 15000, errors:['time']})
                .then(collectd => {
                    if(hangSplit.includes(`${m.content}`)&&((message.content.length == 1))){
                        for(b = 0; b < hangSplit.length; b++){
                            if(m.content == hangSplit[b])
                                corrects.splice(b, 1, `${m.content}`);
                        }
    
                        message.channel.send(`${m.content}, is part of the word.`);
                        message.channel.send(`${corrects}, There are still ${hangSplit.length} spaces left, the guessers have ${6 - badGuesses.length} chances left, the letters (${badGuesses}) are incorrect.`)
                    }
                    if(!(hangSplit.includes(`${message.content}`))&&((message.content.length = 1))){
                        message.channel.send(`${m.content}, is an incorrect guess.`);
                        badGuesses.push(`${m.content}`);
                        message.channel.send(`${corrects}, There are still ${hangSplit.length} spaces left, the guessers have ${6 - badGuesses.length} chances left, the letters (${badGuesses}) are incorrect.`)
                        if(badGuesses.length == 6){
                            message.channel.send(`The guessers are out of chances, the correct word was ${hangWord}`);
                        }
                    }
                })
                .catch(collected => {
                    message.channel.send('The guessers ran out of time')
                })
                //collectorTwo.on('collect', m => {
                //console.log(`Collected ${m.content}`);
                
            //collectorTwo.on('end', collected =>{
            //    console.log(`Colledted ${collected.size} items`);
            //}) 
        }
        
       

    
       /* message.author.awaitMessages({max: 1, time: 1000, errors: ['time'] })
            .then(collected => console.log(collected.msg))
            .catch(collected => collected.log('The user ran out of time to enter their response.')) */
    }
}
