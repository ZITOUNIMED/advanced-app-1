import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebSocketAPI } from './websocket-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notifier: BehaviorSubject<string>;
  webSocketApi: WebSocketAPI;
  messages: string[] = [];
  name = '';

  constructor(){
    this.notifier = new BehaviorSubject<string>('');
    this.webSocketApi = new WebSocketAPI(this.notifier);
  }

  ngOnInit(): void {
    this.notifier.subscribe(message => {
      if(message){
        console.log(message);
        this.messages.unshift(message);
      }
    })
  }

  connect() {
    this.webSocketApi.connect();
  }

  disconnect() {
    this.webSocketApi.disconnect();
  }

  sendMessage() {
    this.webSocketApi.send({name: this.name});
  }
}
