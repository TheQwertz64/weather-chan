const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const {prefix, token, secret_value} = require('./config.json');
const { checkServerIdentity } = require('tls');
const {Client, Intents} = require('discord.js');
const botIntents = new Intents([Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_BANS,Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGES,Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]);
const client = new Client({intents: botIntents});
const { Users/*, CurrencyShop*/ } = require('./dbObjects');
const { Op } = require('sequelize');
//const currency = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

/*Reflect.defineProperty(currency, 'add', {
	eslint-disable-next-line func-name-matching
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});*/

/*Reflect.defineProperty(currency, 'getBalance', {
	eslint-disable-next-line func-name-matching
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});
*/

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
} 

client.cooldowns = new Discord.Collection();

client.once('ready', async () => {
	console.log('Ready!');
	console.log(`Logged in as ${709105097967403068}`);
	const storedBalances = await Users.findAll();
	//storedBalances.forEach(b => currency.set(b.user_id, b));
	Tags.sync();
	client.user.setPresence({
		status: "online", 
		activities: [{
			name:"the world go round.",
			type: 'WATCHING'
		}]
	});
}); 

client.on("guildMemberAdd", member => {
	let guild_name = 'Boxed Water Inc'
	let welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "who’s-ur-gorl-v2")
	welcomeChannel.send(`Welcome to ${guild_name}, enjoy being a gamer, ${member.displayName}.`)

	let memberRole = member.guild.roles.cache.find(role => role.id == "596541108587200516")
	member.roles.add(memberRole);
})

client.on("guildMemberRemove", member => {
	let welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "who’s-ur-gorl-v2")
	welcomeChannel.send(`Can we get an F in the chat for ${member.displayName}. They just Left.`)
})

client.on('messageCreate', async message => {
	if(message.channel.type != 'DM'){
		const filterList = ['apple','salad','bread'];
		let modLog = message.guild.channels.cache.find(channel => channel.name === "super-secret-channel");
		for(i = 0; i < filterList.length; i++) {
			if(message.content.toLowerCase().includes(filterList[i]) && message.author.id != 709105097967403068) {
				message.channel.send(`${message.author} tried to say a bad word.`);
				modLog.send(`${message.author} was warned for trying to say a bad word. Message: \"${message}\"`);
				return message.delete().catch(console.error);
			}
		}
	}	

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log(message.content);

	/*if (commandName === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}:moneybag:`);
	} else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();
		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	} else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}:moneybag: to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}:moneybag:`);
	} else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send(`That item doesn't exist.`);
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
		}
		
		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);
		
		message.channel.send(`You've bought: ${item.name}.`);
	} else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
	} else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true },
		);
	}
	*/
	const command = client.commands.get(commandName) 
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;
	if(command.guildOnly && message.channel.type !== 'GUILD_TEXT'){
		return message.reply({content:'This command can\'t be used in dm\'s'});
	}	

	if (command.args && !args.length) {
			let reply = `Baka, you didn't provide an argument, ${message.author}!`;
			
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			
	return message.channel.send(reply);
	}
	const { cooldowns } = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		
		if(now < expirationTime){
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply({content:`slow down baka, you need to wait ${timeLeft.toFixed(1)} more second(s) before using \`${command.name}\` again.`});
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error){
		console.error(error);
		message.reply({content:'there was an error trying to execute that command.'});
		}
});
	
client.login(token);

