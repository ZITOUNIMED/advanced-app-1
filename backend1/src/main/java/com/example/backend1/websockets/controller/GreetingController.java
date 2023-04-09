package com.example.backend1.websockets.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.backend1.websockets.model.Greeting;
import com.example.backend1.websockets.model.HelloMessage;

@Controller
public class GreetingController {
	private final SimpMessagingTemplate template;
	public GreetingController(SimpMessagingTemplate template) {
		this.template = template;
	}
	
	@MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public void greeting(HelloMessage message) throws Exception {
        // Thread.sleep(1000); // simulated delay
        //return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
		Greeting greeting = new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
		this.template.convertAndSend("/topic/greetings",  greeting);
    }

}
