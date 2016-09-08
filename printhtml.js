var fs = require('fs');
var chat = JSON.parse(require('fs').readFileSync('4-history.json', 'utf8'));

console.log('<html><head><style type="text/css">');
var css = ".sender.personB { \
             color: #2A8282; \
           } \
           .sender.personA { \
             color: #B32F2F; \
           } \
           .column { \
             display: inline-block; \
             margin: 2 \
           } \
           .timestamp { \
             color: #228B22; \
             width: 190px; \
           } \
           .index { \
             width: 50px; \
           } \
           .sender { \
             width: 130px; \
           } \
           .row { \
             min-height: 28px; \
           } \
           .row.personB { \
             background-color: #F5F5DC; \
           } \
           .row.personA { \
             background-color: #E9967A; \
           } \
           h1 { \
             font-size: larger; \
           } \
           .attached { \
             height: 24px; \
             width: 24px; \
             background-image: url('warning.png'); \
             color: #F13B01; \
             font-weight: 600; \
           } \
";
console.log(css);
console.log('</style></head><body>');

for (var i=0000; i<chat.length; i++) {
  var msg = chat[i];
  var senderClass = '';

  if (msg.senderName == 'Facebook User') {
    msg.senderName = 'Mark Zuckerberg';
    senderClass = 'personB';
  }
  else if (msg.senderName == 'My Name') {
    msg.senderName = 'My Name';
    senderClass = 'personA';
  }

  msg.timestampDatetime = msg.timestampDatetime;

  var attachment = '';
  if (msg.attachments.length > 0)
    attachment = 'attached';

  var msgline =
      '<div class="row ' + senderClass + '">' +
      '<div class="column index">' + i + '</div>' + 
      '<div class="column sender ' + senderClass + '">' + msg.senderName + '</div>' +
      '<div class="column timestamp">[' + msg.timestampDatetime + ']</div>' +
      '<div class="column ' + attachment +'">' + attachment + '</div>' +
      '<div class="column body">'+ msg.body + '</div>' +
      '</div>';
  console.log(msgline);
}

console.log('<h1>Data last saved from Facebook on ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '</h1>');
console.log('</body></html>');
