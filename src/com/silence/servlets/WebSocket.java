package com.silence.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class WebSocket {
	//保存每个回话的信息
	private static Map<String, Session> sessions = new HashMap<String, Session>();
	//保存每个用户的信息
	private static Map<String, String> names = new HashMap<String, String>();
	@OnMessage
	public void onMessage(String message, Session session) throws IOException, InterruptedException {
		Set<String> keys = sessions.keySet();
		if ("urs".equals(message)) {
			if (!names.isEmpty()) {
				StringBuffer namelist = new StringBuffer();
				for (String name : names.values()) {
					namelist.append(name).append(",");
				}
				session.getBasicRemote().sendText(namelist.append("urs").toString());
			}
			return;
		}else if ("client_close".equals(message.trim())) {
			for (String key : keys) {
				Session s = (Session) sessions.get(key);
				if ((s.isOpen()) && (s.getId() != session.getId()) && (names.get(session.getId()) != null)) {
					s.getBasicRemote().sendText(names.get(session.getId()) + "del");
					System.out.println("客户端" + names.get(session.getId()) + "下线！");
				}
			}
			return;
		} else if (message.trim().endsWith("add")){
			names.put(session.getId(), message.trim().substring(0, message.trim().length() - 3));
			System.out.println("客户端 " + message + " 上线！session_id is " + session.getId());
		}
		for (String key : keys) {
			Session s = (Session) sessions.get(key);
			if ((s.isOpen()) && (s.getId() != session.getId())) {
				if (message.trim().endsWith("mss")){
					s.getBasicRemote().sendText(names.get(session.getId()) + "," +message.trim());
				}else{					
					s.getBasicRemote().sendText(message.trim());
				}
				System.out.println("发送成功！");
			}
		}
	}

	@OnOpen
	public void onOpen(Session session, EndpointConfig config) {
		System.out.println("客户端建立链接,session_id = " + session.getId());
		try {
			sessions.put(session.getId(), session);
			onMessage("urs", session);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@OnClose
	public void onClose(Session session, CloseReason reason) {
		try {
			System.out.println("客户端关闭连接,session_id=" + session.getId());
			onMessage("client_close", session);
			synchronized (sessions) {
				sessions.remove(session.getId());
				names.remove(session.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		System.out.println("服务器出错.....session_id = " + session.getId());
	}

}