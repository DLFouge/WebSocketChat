var path = 'ws://' + window.location.host + "/" + window.location.pathname.split("/")[1];
//我们连接到websocket 服务器端，使用构造函数 new WebSocket() 
var webSocket = new WebSocket(path+'/websocket');
//onError 当客户端-服务器通信发生错误时将会调用此方法。
webSocket.onerror = function(event) {
	onError(event)
};
//onOpen 我们创建一个连接到服务器的连接时将会调用此方法。
webSocket.onopen = function(event) {onOpen(event);};
//onMessage 当从服务器接收到一个消息时将会调用此方法。在我们的例子中，我们只是将从服务器获得的消息添加到DOM。
webSocket.onmessage = function(event) {onMessage(event)};
function onOpen(event) {}
function onError(event) {alert("无法与服务器建立连接！请检查网络故障！");}
function getRandomImg(){
	var random = parseInt(Math.random(1) * 3 + 1);
	var img = "img/demo/av"+random+".jpg";
	return img;
}
//服务器端推送回来的消息
function onMessage(event){
	var data = event.data.trim();
	var name = data.slice(0,data.length - 3).trim();
	//初始化网页，初始化原本存在的用户
	if (data.endsWith("urs")){
		var names = data.slice(0,data.length - 4).trim();
		var nameList = names.split(",");
		nameList.forEach(function(index){
			add_user(index.trim());
		});	
	}
	//通知客户端刚添加的用户
	else if (data.endsWith("add")){
		add_user(name);
	//用户下线，移除
	}else if (data.endsWith("del")){
		var user_id = '#'+ name +"1";
		remove_user(user_id,name);
	}else if (data.endsWith("mss")){
		var user_name = name.split(",")[0];
		var message = name.substring(user_name.length + 1,name.length);
		add_message(user_name,getRandomImg(),message,false);
	}
}