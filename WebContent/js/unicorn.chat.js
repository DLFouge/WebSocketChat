$(document).ready(function(){
	var msg_template = '<p><span class="msg-block"><strong></strong><span class="time"></span><span class="msg"></span></span></p>';
	$('.chat-message button').click(function(){
		var input = $(this).siblings('span').children('input[type=text]');		
		if(input.val() != ''){
			webSocket.send(input.val()+"mss");//发送websocket消息
			add_message('You','img/demo/av1.jpg',input.val(),true);
		}		
	});
	$('.chat-message input').keypress(function(e){
		if(e.which == 13) {	
			if($(this).val() != ''){
				webSocket.send($(this).val()+"mss");//发送websocket消息
				add_message('You','img/demo/av1.jpg',$(this).val(),true);
			}		
		}
	});
	setTimeout(function(){
			add_message('Michelle','img/demo/av2.jpg','I have a problem. My computer not work!')
		},'6000');
	setTimeout(function(){
		remove_user("#michelle","Michelle");
	}, 16000);
 });
