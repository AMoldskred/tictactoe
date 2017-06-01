
$login = false;
  var socket = io();
  socket.on('connect', function (data) {
    $('#s').html('Connected');
  });

if($login == false){
	document.addEventListener('keydown', function(e) {
  if(e.keyCode == 13){
  	$login = true;
  	$user = $('#username').val()
	if($user == ''){}
		else{
			socket.emit('username', { username : $user})
		}
  }
});
}

$('#login').on('click',function(){
	$login = true;
	$user = $('#username').val()
	if($user == ''){}
		else{
			socket.emit('username', { username : $user})
		}
})


socket.on('granted', function(){
	$('.start').fadeOut('slow');
	setTimeout(function(){
	$('#panel').fadeIn('slow');	
},400);
	
socket.on('update', function(data){

})
})