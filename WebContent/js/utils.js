var i = 0;
function add_message(name,img,msg,clear) {
	i = i + 1;
	var  inner = $('#chat-messages-inner');
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	if(hours < 10) hours = '0' + hours;
	if(minutes < 10) minutes = '0' + minutes;
	var id = 'msg-'+i;
    var idname = name.replace(' ','-').toLowerCase();
	inner.append('<p id="'+id+'" class="user-'+idname+'"><img src="'+img+'" alt="" />'
									+'<span class="msg-block"><strong>'+name+'</strong> <span class="time">- '+hours+':'+minutes+'</span>'
									+'<span class="msg">'+msg+'</span></span></p>');
	$('#'+id).hide().fadeIn(800);
	if(clear) {
		$('.chat-message input').val('').focus();
	}
	$('#chat-messages').animate({ scrollTop: inner.height() },1000);
}
function remove_user(userid,name){
	$(userid).addClass('offline').delay(1000).slideUp(800,function(){
        $(this).remove();
    });
    var  inner = $('#chat-messages-inner');
    inner.append('<p class="offline" id="'+name+'"><span>User '+name+' left the chat</span></p>');
    $(userid).hide().fadeIn(800);
}
function add_user(name){
	var user_info = "<li id='"+name+"1' class='online new'><a href='#'><img alt='' src='"+getRandomImg()+"'/> <span>"+name+"</span></a></li>";
	$(".contact-list").append(user_info);
	var  inner = $('#chat-messages-inner');
    inner.append('<p class="offline" id="'+name+'"><span>User '+name+' login the chat</span></p>');
}