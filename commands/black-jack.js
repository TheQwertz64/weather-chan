const { Message, SystemChannelFlags } = require("discord.js")

module.exports = {
    name: "black-jack",
    description: "play a classic game of black jack, currency wallets and multiplayer coming eventually",
    args: true,
    aliases: ["21"],
    usage: '<bet>',
    execute(message, args){
        if (typeof(args) != "object"){
            message.reply({content: 'Invalid bet'});
            
        }
        else{
            var cards = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];
            var deck =  cards.concat(cards,cards,cards);
            var playerTotal = 0;
            var dealerTotal = 0;
            var playerAce = 0;
            var dealerAce = 0;
            function addCard(card,deck,ace,total){
                if(deck[card] == "ace"){
                    total += 1;
                    ace++;
                }
                else if(deck[card] == "jack" || deck[card] == "queen" || deck[card] == "king"){
                    total += 10;
                }
                else{
                    total += parseInt(deck[card]);
                }
                let temp = deck[deck.length - 1];
                deck[deck.length - 1] = deck[card];
                deck[card] = temp;
                deck.pop();
                let vals = [total,ace,deck];
                console.log(vals.toString());
                return vals
            }
            message.reply({content: `started a game of black jack wagering ${args} Good Luck!`})
            function toString(arr){
                let info = '';
                for(i = 0; i < arr.length; i++){
                    info.concat(' ',arr[i]);
                }
                return info;
            }
            function deal(deck,playerTotal,dealerTotal,playerAce,dealerAce){
                var card1 = Math.trunc(Math.random() * deck.length);
                var vals1 = addCard(card1,deck,playerAce,playerTotal);
                playerTotal += vals1[0];
                playerAce += vals1[1];
                deck = vals1[2];
                var card1P = deck[card1];
                var card2 = Math.trunc(Math.random() * deck.length);
                var revealedCard = deck[card2];
                var vals2 = addCard(card2,deck,dealerAce,dealerTotal);
                dealerTotal += vals2[0];
                dealerAce += vals2[1];
                deck = vals2[2];
                var card3 = Math.trunc(Math.random() * deck.length);
                var card3P = deck[card3];
                var vals3 = addCard(card3,deck,playerAce,playerTotal);
                playerTotal += vals3[0];
                playerAce += vals3[1];
                deck = vals3[2];
                card4 = Math.trunc(Math.random() * deck.length);
                var vals4 = addCard(card4,deck,dealerAce,dealerTotal);
                dealerTotal += vals4[0];
                dealerAce += vals4[1];
                deck = vals3[2];

                if((playerTotal == 11 && playerAce >= 1) && (dealerTotal == 11 ** dealerAce >= 1)){
                    message.reply({content:"The game was a tie, you didn't win or lose any money"});
                }
                if(playerTotal == 11 && playerAce >= 1){
                    message.reply({content:`You won the game and recieved ${args * 2} dollars`});
                }
                else if(dealerTotal == 11 ** dealerAce >= 1){
                    message.reply({content:"The dealer won and you lost all your bet money"});
                }
                else{
                    message.reply({content:`you drew a ${card1P} and a ${card3P}, the dealer reveals a ${revealedCard}, would you like to hit? (yes or no)`});
                }
                var newVals = [playerTotal, playerAce, dealerTotal, dealerAce, deck];
                console.log(toString(newVals));
                return newVals;
            }
            var newVals = deal(deck,playerTotal,dealerTotal,playerAce,dealerAce);
            playerTotal = newVals[0];
            playerAce = newVals[1];
            dealerTotal = newVals[2];
            dealerAce = newVals[3];
            deck = newVals[4];
            console.log(dealerTotal);
            function hitStand(){
                var hit = false;
                const filter = response => (response.content.includes("yes") || response.content.includes("no")) && response.author.id === message.author.id;
                /*message.channel.send("hit? (yes/no)").then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                        .then(collected => {
                            console.log(m.content);
                            if(response.content.toString() === ("yes")){
                                hit = true;
                            }
                        })
                        .catch(collected => {
                            message.channel.send("you ran out of time and held");
                        });
                    });*/
                const collector = message.channel.createMessageCollector({filter, max: 1, time: 15000 });
                collector.on('collect', m => {
                    console.log(`Collected ${m.content}`);
                    //hit = true;
                    if(m.content.toString() === ("yes")){
                        hit = true;
                    }
                });
            
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                });
                return hit;
            }
            var cont = hitStand();
            console.log(cont);
            while(cont){
                yourNext = Math.trunc(Math.random() * deck.length);
                message.channel.send(`you drew a ${deck[yourNext]}`);
                addCard(yourNext,deck,playerAce,playerTotal);
                if(playerTotal > 21){
                    message.reply({content:"you busted and lost all your bet money"});
                    cont = false;
                }
                else{
                    message.reply({content:'Hit again? (yes/no)'});
                    cont = hitStand();
                }
            }
            console.log("bruh moment");
            /*
            if(dealerAce == 1){
                dealerTotal += 10
            }
            var startAce = dealerAce;
            while (dealerTotal < 17){
                message.channel.send("The dealer hits")
                cardNext = Math.trunc(Math.random() * deck.length);
                message.channel.send(`The dealer draws a ${deck[cardNext]}`)
                addCard(cardNext,deck,dealerAce,dealerTotal);
                if (dealerAce > startAce && (dealerTotal + 10 < 22 && dealerTotal + 10 > 16)){
                    dealerTotal += 10;
                }
            }
            if (dealerTotal > 21){
                message.reply(`The dealer busted, you won ${args * 2} coins`);
            }
            for(var i = 0; i < playerAce; i++){
                if (playerTotal + 10 < 22){
                    playerTotal += 10;
                }
            }
            if (playerTotal > dealerTotal){
                message.reply(`Congrats you won and recieved ${args * 2} dollars`);
            }
            else if(playerTotal == dealerTotal){
                message.reply("you tied the dealer and recieved your bet back");
            }
            else{
                message.reply("Silly Baka, you lost this game and your bet money");
            }*/
        }
    }
}