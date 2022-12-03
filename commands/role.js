module.exports = {
	name: 'role',
	description: 'gives roles',
	args: true,
	usage: '<user>, <role>',
	execute(message, args) {
		/*if (!message.mentions.users.size) {
			return message.reply('No user tagged.');
		} */

		//let adminID = message.guild.roles.cache.find(role => role.id == "538937873513185291");
		let member = message.member;
		//var roleName = 'Certified Gamer'; //args[0].toLowerCase;
		if(member.roles.cache.has('538937873513185291')) {
			//let role = message.guild.roles.cache.find(r => r.name === 'Certied Gamer');
			let role = message.guild.roles.cache.find(role => role.id == "538942346012786698")
			const taggedMember = message.mentions.users.first();
			member.roles.add(role);
			message.channel.send ('role succeusfully distributed');
		}
		else{
			message.reply ({content:'you don\'t have permission to use this command'})
		}
		/*const member = message.mentions.members.first();
	
		if(member.roles.cache.some(role === )){
			member.roles.add(role);
			//message.mentions.user.addRole(role);
			message.channel.send ('role(s) succeusfully distributed');
		}
		else{
			message.reply ('you don\'t have permission to use this command')
		}
		const profileList = message.mentions.user.map(user => {
			user.give.role;
		}) */
	},
};