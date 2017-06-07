var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading...');
    }

    res.writeHead(200);
    res.end(data);
  });
}

numusr = 0;



io.on('connection', function (socket) {
	console.log('New connect');
	socket.emit('connect');

	socket.on('username', function(data){
		console.log(data.username);
      socket.user = data.username;
		socket.emit('granted');
	});
socket.on('disconnect', function(){
        console.log('Disconnect');
    });


socket.on('remusrone', function(){
  socket.leave('one');
})




socket.on('play', function(data){
  console.log('Entering game:')
        if(data.gametype == 'ai'){
          socket.emit('ai');
          console.log('AI');
        }
        else if(data.gametype == 'rp'){
          if(numusr < 2){

            //Game start
            //----------------------
            socket.emit('upd', {
            usr: numusr
            }); 
            socket.emit('rp-ret');

              socket.join('one');
               numusr++;
               if(numusr == 2){
                console.log('Start game');
                socket.in('one').emit('start');
              }

              
          socket.on('elem', function(d){
            console.log('Player '+d.xo+' chose square: '+d.tclass);
            socket.to('one').emit('elem', {
              user: d.username,
              xo: d.xo,
              move: d.tclass
            });

          });

          }else{
            socket.emit('full');
          }
          console.log(numusr+' player/s in room one');
          console.log('Real player');
      socket.on('disconnect', function(){
        console.log('Disconnect');
        numusr--;
        socket.to('one').emit('left');
      });
        }
    });

});  
