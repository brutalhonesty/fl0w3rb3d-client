var Steam = require('steam');
var bot = new Steam.SteamClient();
//var TeamFortress2 = require('tf2');
//var tf2 = new TeamFortress2(bot);
var settings = require('./settings');
bot.logOn({
	accountName: settings.accountName,
	password: settings.password
});
bot.on('loggedOn', function () {
	console.log('Logged in!');
	bot.setPersonaState(Steam.EPersonaState.Online);
	bot.setPersonaName(settings.persona);
	//tf2.playTF2();
});
bot.on('relationships', function () {
	for(var friend in bot.friends) {
		if(bot.friends[friend] === Steam.EFriendRelationship.PendingInvitee) {
			bot.addFriend(friend);
		}
	}
});
// When bot recieves a message
bot.on('message', function (source, message, type, chatter) {
	switch(type) {
		case 1:
			console.log('Recieved message ' + message);
			var response = "";
			switch(message) {
				case 'ping':
					response = "pong";
				break;
				default:
					response = "Unknown command.";
				break;
			}
			bot.sendMessage(source, response, Steam.EChatEntryType.ChatMsg);
		break;
		case 2:
			console.log('User is typing a message.');
		break;
	}
});