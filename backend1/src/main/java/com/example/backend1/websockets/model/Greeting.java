package com.example.backend1.websockets.model;

public class Greeting {
	private String content;
	
	public Greeting() {
	}
	
	public Greeting(String content) {
		super();
		this.content = content;
	}

	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
}
