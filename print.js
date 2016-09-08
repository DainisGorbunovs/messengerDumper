var fs = require('fs');
var chat = JSON.parse(require('fs').readFileSync('4-history.json', 'utf8'));

//for (var i=0000; i<chat.length; i++) {
var imin = 3000;
for (var i=imin; i<imin+400; i++) {
  var msg = chat[i];

  if (msg.senderName == 'Facebook User')
    msg.senderName = '\x1b[36m' + 'Mark Zuckerberg' + '\x1b[0m';
  else if (msg.senderName == 'My Name')
    msg.senderName = '\x1b[37m' + 'My Name' + '\x1b[0m';

  msg.timestampDatetime = '\x1b[33m' + msg.timestampDatetime + '\x1b[0m';

  var attachment = '';
  if (msg.attachments.length > 0)
    attachment = '\x1b[31m' + 'X' + '\x1b[0m';

  var msgline = i + ':' + msg.senderName + ' [' + msg.timestampDatetime + ']' + attachment + ': ' + msg.body;
  console.log(msgline);
}
