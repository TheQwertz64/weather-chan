module.exports = {
    name: 'roulette',
    description: 'bet coins on a roulette, bet on red, black, green, or bait',
    usage: '<amount>, <color>',
    execute(message, args){
        let amount = parseInt(args[0]);
        let myColor = String(args[1]);
        if(amount < 1 || isNaN(amount)){
            return message.reply({content:'invalid bet amount'});
        }
        else if(myColor != 'black' && myColor != 'green' && myColor != 'bait' && myColor != 'red'){
            return message.reply({content:'invalid bet'});
        }
        message.reply({content:`good luck you bet ${amount} on ${myColor}`});
        function spin(){
            let numberRoll = Math.random()*37 + 1;
            let roll = Math.trunc(numberRoll);
            let color = '';
            let bait = false;
            if((roll >= 37)){
                color = 'green';
            }
            else if((roll % 2 == 0 && ((roll >= 1 && roll <= 10) || (roll >= 19 && roll <= 28))) || (roll % 2 == 1 && ((roll >= 11 && roll <= 18) || (roll >= 29 && roll <= 36)))){
                color = 'black';
            }
            else if((roll % 2 == 1 && ((roll >= 1 && roll <= 10) || (roll >= 19 && roll <= 28))) || (roll % 2 == 0 && ((roll >= 11 && roll <= 18) || (roll >= 29 && roll <= 36)))){
                color = 'red';
            }
            if (roll <=2 || roll == 27 || roll == 28){
                bait =  true;
            }
            let result = [color,bait,roll];
            console.log(color);
            return result;
        }
        let myResult = spin();
        var hit = false;
        if (myColor === 'bait' && myResult[1] === true){
            message.reply({content:`The roll is ${myResult[2]}, you won ${amount * 7} on bait`});
            hit = true;
        }
        if (myColor === 'green' && myResult[0] === 'green'){
            message.reply({content:`The roll is ${myResult[2]}, you won ${amount * 14} on green`});
        }
        else if(myColor === myResult[0]){
            message.reply({content:`The roll is ${myResult[2]}, you won ${amount * 2} on ${myColor}`});
        }
        else if (hit === false){
            message.reply({content:`The roll is ${myResult[2]}, you lost your money baka`});
        }
        console.log(hit);
    }
}