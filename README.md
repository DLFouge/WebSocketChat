# 一款基于HTML5 WebSocket，Tomcat的在线及时聊天系统
#### 在线测试地址 http://120.27.114.229/WebSocketChat/index.html (该地址是阿里云上的服务器地址，公网可用)
---HTML5 WebSocket API客户端与服务器端进行全双工通讯，WebSocket的出现是基于Web应用的实时性需要而产生的，它允
许客户端和服务器在任意时刻互相推送消息。Web Socket是下一代客户端-服务器异步通讯的方法，它本事上任然是一个基于
TCP的协议，它使用ws或wss协议，可用于任意的客户端和服务器。为了建立一个 WebSocket连接，客户端浏览器首先要向服
务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息”Upgrade: WebSocket”(”Upgrade:
WebSocket”表示这是一个特殊的 HTTP 请求，请求的目的就是要将客户端和服务器端的通讯协议从 HTTP 协议升级到 WebSocket 协议。)表明这是一个申请协议升级的 HTTP
请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息。
并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。它的通讯方式如下：图客户端和服务器websocket通讯。
![image](https://github.com/silence940109/PrescriptionTrackSystem/blob/master/systemimages/websocket.jpg)
---
## 主要任务
---
1.用户上线<br>
	广播提醒所有的客户端有用户上线并显示该上线的用户<br>
	对于刚上线的用户，显示已经上线的用户<br>
2.用户下线<br>
	广播提醒所有的客户端有用户下线并<br>
3.消息广播处理<br>
	对于某个用户发送的消息进行广播性的通知所有的客户端并传送该消息<br>

## 运行效果
![image](https://github.com/silence940109/WebSocketChat/blob/master/images/img1.png)
![image](https://github.com/silence940109/WebSocketChat/blob/master/images/img2.png)

## 安装
1、tomcat7服务器
2、jdk1.7


