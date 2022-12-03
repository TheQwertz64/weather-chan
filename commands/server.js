module.exports = {
	name: 'server',
	description: 'Gives basic server info.',
	execute(message, args){
		const Discord = require('discord.js');
		const serverPage = new Discord.MessageEmbed()
	.setColor('#338BE5')
	.setTitle(`${message.guild.name}`)
	.setURL('https://discord.gg/53xacMj')
	.setDescription('Put a custom server description here baka.')
	.setThumbnail('https://cdn.discordapp.com/attachments/632344366110867479/729929769956802682/water.jpg')
	.addFields(
		{name: 'Member Count:', value: `${message.guild.memberCount}`}
	)
	.setFooter({ text:'Info provided by Weather Chan.', iconURL:'https://i.imgur.com/MjH7qpG.png'});
	
message.channel.send({ embeds: [serverPage] });
	
	},
};