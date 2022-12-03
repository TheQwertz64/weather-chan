module.exports = {
    name: 'giveaway',
    description: 'Starts a giveaway that allows members to enter by reacting',
    guildOnly: true,
    args: true,
    wip: true,
    usage: '<item> <timeMinutes>',
    execute (message, args){
        const giveAwayTime = args[1] * 60000;
        var entries = new Array();
        //const reactionEmoji = message.guild.emojis.get('990115994758443099');
        const giveAway = message.channel.send(`${message.author} started a giveaway for ${args[0]} react with :cloud_rain: to enter, ends in ${args[1]} minutes`);
            //.then((message) => {
            //    message.react('990113376690655272')
            //})
        message.react('🌧');
        const filter = (reaction, user) => {
            return reaction.emoji.name === '🌧' && !user.bot;
        };
        const collector = message.createReactionCollector({filter, time: giveAwayTime});
        

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            entries.push(user);
        });
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            if (entries.length === 0){
                message.channel.send(`No one entered ${message.author}\'s giveaway. Sad.`)
            }
            else{
                var numberRoll = Math.random()*entries.length;
                var intRoll = Math.trunc(numberRoll);
                message.channel.send(`${entries[intRoll].tag} won the giveaway for ${args[0]}`);
            }
        });
        
        
    }

}