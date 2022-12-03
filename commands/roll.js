module.exports = {
    name: 'roll',
    description: 'rolls a number between 1 and 100 or between 1 and a number you input',
    execute(message, args){
        if(!args.length) {
            var numberRoll = Math.random()*99 + 1;
            var intRoll = Math.trunc(numberRoll);
            message.channel.send(`${message.author} rolled ${intRoll}.`);
        }
        else{
            var numberRoll = Math.random()*args[0] + 1;
            var intRoll = Math.trunc(numberRoll);
            message.channel.send(`${message.author} rolled ${intRoll}.`);
        }
    }
}