module.exports = {
	name: 'profile',
	aliases: ['user'],
	description: 'tells profile info',
	execute(message, args){
		const Discord = require('discord.js');
		if (!message.mentions.users.size) {
			const profileEmbed = new Discord.MessageEmbed()
				.setColor('#C67FD1')
				.setTitle(`${message.author.username}`)
				//.setThumbnail(`${message.author.displayAvatarURL}`)
				.addFields(
					{name: 'User ID:', value: (`${message.author.id}`)}
				)
				.setFooter('Info provided by Weather Chan.', 'https://media.discordapp.net/attachments/538952672703807518/729931134452105226/Weather_Chan.png')
				.setTimestamp();
		
			message.channel.send({ embeds: [profileEmbed]});
		}
		else{
			const profileList = message.mentions.users.map(user => {
				return `User: ${user.username}\nId: ${user.id}\nPFP: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
				});
				message.channel.send(profileList); 
				(`<${message.author.displayAvatarURL({ format: "png", dynamic: true})}>`)
				}
			}
		}
			/*const profileList = message.mention.users.map(user => {
					const profileEmbedAlt = new Discord.MessageEmbed()
						.setColor('#C67FD1')
						.setTitle(`${user.username}`)
						//.setThumbnail(`${user.displayAvatarURL}`)
						.addFields(
						{name: 'User ID:', value: (`${user.id}`)}
						)
					.setFooter('Info provided by Weather Chan.', 'https://media.discordapp.net/attachments/538952672703807518/729931134452105226/Weather_Chan.png');
			});
			message.channel.send(profileEmbedAlt);
			message.channel.send(profileList);
		} */
	

//return message.channel.send(`User: ${message.author.username}\nID: \nPFP: )}>`);