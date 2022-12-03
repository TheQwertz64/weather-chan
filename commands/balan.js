//const {currency} = require('../index.js');

module.exports = {
    name: 'balan',
    description: 'gives users current coin balance',
    execute(message, args){
        const target = message.mentions.users.first() || message.author;
        //return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}:moneybag:`);
    }
}