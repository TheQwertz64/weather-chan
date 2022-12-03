module.exports = {
    name: 'connect4',
    description: 'play a fun connect4 game.',
    wip: true,
    execute(message){
        message.channel.send(`${message.author} started a game of connect4.`);
        const filter = (reaction, user) => {
            
        }
    }
}