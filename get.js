var fs = require('fs');
var login = require('facebook-chat-api');
var credentials = JSON.parse(require('fs').readFileSync('credentials.json', 'utf8'));
var personID = '4';

login(credentials, function callback (err, api) {
	if(err) return console.error(err);

	// api.getThreadList(0, 20, function(err, arr){
	// 	if(err) return console.error(err);
		
	// 	var threadID = [];
	// 	for (var i=0; i < arr.length; i++) {
	// 		var participants = arr[i].participants;
	// 		if (participants.indexOf(personID) > -1) {
	// 			threadID.push(arr[i].threadID);
	// 		}
	// 	}

	// 	console.log(threadID);
	// 	for (var i=0; i < threadID.length; i++) {
	// 		var messageCount = 0;
	// 		api.getThreadInfo(threadID[i], function(err, arr) {
	// 			console.log(arr);
	// 			messageCount = arr.messageCount;
	// 			console.log('Total messges:' + messageCount)
	// 			api.getThreadHistory(threadID[i], 10, 15, null, function(err, arr) {
	// 				console.log(arr);
	// 			});
	// 		});
	// 	}
	// });

	api.getThreadInfo(personID, function(err, arr) {
		fs.writeFile('./'+personID+'-info.json', JSON.stringify(arr, 0, 2) , 'utf-8');
		console.log(arr);
		var messageCount = arr.messageCount;
		console.log('There are messages: ' + messageCount);
		var datetime = new Date(2016, 9, 5).getTime();
		datetime = null;
		api.getThreadHistory(personID, 0, 30000, datetime, function(err, arr) {
			fs.writeFile('./'+personID+'-history.json', JSON.stringify(arr, 0, 2) , 'utf-8');
			console.log('Saving ' + arr.length + ' messages.');
			api.logout(function() {console.log('Logged out.')});
		});
	});

});
