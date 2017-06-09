#!/usr/bin/env nodejs


var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(8080, 'localhost');


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
//Winning numbers
$one = [1,2,3];
$two = [4,5,6];
$three = [7,8,9];
$four = [1,4,7];
$five = [2,5,8];
$six = [3,6,9];
$seven = [1,5,9];
$eight = [3,5,7];
$arrs = [$one, $two, $three, $four, $five, $six, $seven, $eight];
//---------------------------------

function containsAll(arrs, haystack){
  $win = false;
  for(var s = 0 , len = arrs.length; s < len; s++){
    
    $w = 0;
    var ele = arrs[s]
    
  for(var i = 0 , lens = ele.length; i < lens; i++){
    var elem = ele[i];
    
     if(haystack.indexOf(elem) == -1){}
     else{
      $w++;
      if($w == 3){
        $win = true;
      }else{
      
      }

  }
  }
}

}


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



function checko(){
containsAll($arrs, $onum)
}
function checkx(){
containsAll($arrs, $xnum)

}



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
              $xnum = [];
              $onum = [];
              
          socket.on('elem', function(d){
            console.log('Player '+d.xo+' chose square: '+d.tclass);
            socket.to('one').emit('elem', {
              user: d.username,
              xo: d.xo,
              move: d.tclass
            });

            if(d.xo == 0){
              $xusr = d.username;
              var num = parseInt(d.tclass)
              $xnum.push(num);
              $xnum.sort(function(a, b){return a-b});
              console.log($xnum);
              if($xnum.length > 2){
              checkx();
              console.log($win);
              if($win){
                console.log('X wins')
                socket.emit('win', {
                  winner : 'X',
                  usr : $xusr
                })
                socket.to('one').emit('win', {
                  winner : 'X',
                  usr : $xusr
                })
              }else if($xnum.length == 5 && $win == false){
              socket.emit('tie');
              socket.to('one').emit('tie');
            } 
            }
            }else if(d.xo == 1){
              $ousr = d.username;
              var num = parseInt(d.tclass)
              $onum.push(num);
              $onum.sort(function(a, b){return a-b});
              console.log($onum);
              if($onum.length > 2){
              checko();
              console.log($win);
              if($win){
                console.log('O wins');
                socket.emit('win', {
                  winner : 'O',
                  usr : $ousr
                })
                socket.to('one').emit('win', {
                  winner : 'X',
                  usr : $ousr
                })
              }else if($xnum.length == 5 && $win == false){
              socket.emit('tie');
              socket.to('one').emit('tie');
            }

              }
              
            }

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
