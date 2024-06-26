import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { ChatMessage, ChatUser } from '../models/chat/chat.model';
import { Message } from '../models/chat/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  get registerUserUrl() { return 'https://localhost:7217/api/chat/register-user'; }
  get removeUserUrl() { return 'https://localhost:7217/api/chat/remove-user'; }
  get getUsersUrl() { return 'https://localhost:7217/api/account/users'; }
  get saveChatMessageUrl() { return 'https://localhost:7217/api/chat/save-chat-message'; }
  get loadConversationUrl() { return 'https://localhost:7217/api/chat/load-conversation'; }
  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      //Authorization: `Bearer ${this.authService.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });

    return { headers };
  }

  private chatConnection?: HubConnection;

  onlineUsers: string[] = [];
  chatUsers: ChatUser[] = [];
  selectedUserMessages: ChatMessage[] = [];
  currentUserMessages: ChatMessage[] = [];

  constructor(protected http: HttpClient) {
  }

  getChatUsers(currentUser: string) {
    const endpointUrl = `${this.getUsersUrl}`;
    return this.http.get<User[]>(endpointUrl, this.requestHeaders);
  }

  getUserMessages(from: string, to: string) {
    //this.selectedUserMessages.forEach(msg => {
    //  tmessages.push({type:msg., date : msg.date})
    //});
    //var tmessages: ChatMessage[] =
    //  [
    //    new ChatMessage('odd', 'Hi, how are you ?', new Date()),
    //    new ChatMessage('even', 'Hi, I am fine and you ?', new Date()),
    //    new ChatMessage('odd', 'Thank you, I am fine too', new Date())
    //  ];
    var message: Message = { from: from, to: to, message: '' }

    return this.chatConnection?.invoke("LoadMessages", message);
  }

  registerUser<T>(user: User): Observable<T> {
    return this.http.post<T>(this.registerUserUrl + '/' + user.userName, JSON.stringify(user), this.requestHeaders);
  }

  async disconnectUser(userName: string) {
    return this.chatConnection?.invoke("RemoveUserConnection", userName)
      .catch(error => {
        alert(error.message);
      });
  }

  public createChatConnection(userName: string) {
    this.chatConnection = new HubConnectionBuilder().withUrl("https://localhost:7217/hubs/chat", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).withAutomaticReconnect().build();

    this.chatConnection.start().catch(error => {
      alert(error.error);
    });

    this.chatConnection.on("UserConnected", () => { this.addUserConnectionId(userName); });

    this.chatConnection.on("onlineUsers", (onlineUsers) => {
      this.onlineUsers = [...onlineUsers];
    });

    this.chatConnection.on("NewMessage", (message) => {
      var msg: ChatMessage = {
        type: '',
        date: new Date(),
        msg: message
      }; 
      this.currentUserMessages.push(msg);   
      //this.currentUserMessages = [...this.selectedUserMessages].filter(x => (x.msg.from == message.from && x.msg.to == message.to)
      //  || (x.msg.to == message.from && x.msg.from == message.to));
     
    });

    this.chatConnection.on("LoadMessages", (users) => {

      this.loadCurrentConversation(users.from, users.to)

      this.currentUserMessages = [...this.selectedUserMessages].filter(x => (x.msg.from == users.from && x.msg.to == users.to)
        || (x.msg.to == users.from && x.msg.from == users.to));
    });
  }

  loadCurrentConversation(from:string, to:string) {
    this.http.get<Message[]>(this.loadConversationUrl + "/" + from + "/" + to, this.requestHeaders).subscribe({
      next: result => {
        this.currentUserMessages = result.map(x => <ChatMessage>{
          date: new Date(),
          type: '',
          msg: {
            from: x.from,
            to: x.to,
            message: x.message
          }
        });
      },
      error: error => { alert(error); }
    });
  }

  saveChatMessage(from: string, to: string, message: string) {
    var tmessage: Message = { from: from, to: to, message: message }
    this.http.post(this.saveChatMessageUrl, JSON.stringify(tmessage), this.requestHeaders).subscribe({
      next: _ => {
        //this.loadCurrentConversation(from, message)
      },
      error: error => { alert(error); }
    });
  }

  stopChatConnection() {
    this.chatConnection?.stop().catch(error => {
      alert(error.message);
    });
  }

  async addUserConnectionId(userName: string) {
    return this.chatConnection?.invoke("AddUserConnectionId", userName)
      .catch(error => {
        alert(error.message);
      });
  }

  async sendMessage(from: string, to: string, content: string) {
    const message: Message = {
      from: from,
      to: to,
      message: content
    }
    return this.chatConnection?.invoke("ReceiveMessage", message);
  }
}
