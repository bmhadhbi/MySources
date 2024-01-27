import { Component, ViewChild, ElementRef } from '@angular/core';
import { messages } from './chat-data';
import { ChatService } from '../../../services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogInfoComponent } from '../../dialogs/dialog-info.component';
import { User } from '../../../models/user.model';
import { ChatMessage, ChatUser } from '../../../models/chat/chat.model';
import { LocalService } from '../../../services/local-service';
import { DBkeys } from '../../../services/db-keys';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class AppChatComponent {
  user: any;

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;
  selectedUser: ChatUser;
  chatUsers: ChatUser[];
  serachText: string = '';

  constructor(public chatService: ChatService,
    private localService: LocalService,
    public dialog: MatDialog) {
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  onSelect(user: ChatUser): void {
    this.selectedUser = user;  
    this.chatService.getUserMessages(user.from, this.user.userName);
  }

  async ngOnInit() {
    this.user = JSON.parse(this.localService.getData(DBkeys.CurrentUser) ?? "");
    await this.chatService.getChatUsers(this.user.userName).subscribe({
      next: (users) => {
        this.chatService.chatUsers = [];
        users.forEach(x => {
          if (x.userName.toLowerCase() != this.user.userName.toLowerCase())
            this.chatService.chatUsers.push(new ChatUser(x.userName, x.fullName, 'assets/images/profile/user-1.jpg', 'Subject of ' + x.userName));
          this.selectedUser = this.chatService.chatUsers[0];
          this.chatService.loadCurrentConversation(this.user.userName, this.selectedUser.from);
        });
      },
      error: error => { }
    });

    if (this.user != "") {
      this.chatService.registerUser(this.user)
        .subscribe({
          next: () => {
            this.chatService.createChatConnection(this.user.userName);
          },
          error: error => { this.openDialog('0ms', '0ms', 'Error!', error.error, 'Ok', '') }
        });
    }
  }

  search() {
    this.chatService.getChatUsers(this.user.userName);
    this.chatService.chatUsers = this.chatService.chatUsers.filter(x => x.from.toLowerCase().includes(this.serachText.toLowerCase()));
    var defaultUser: ChatUser = { from: '', name: '', photo: '', subject: '' };
    this.selectedUser = this.chatService.chatUsers.length > 0 ? this.chatService.chatUsers[0] : defaultUser;
    this.chatService.getUserMessages(this.selectedUser.from, this.user.userName)
  }

  substring(value: string) {
    return value.substring(0, 17);
  }

  isOnline(user) {
    return this.chatService.onlineUsers.filter(x => x == user)?.length > 0;
  }

  OnAddMsg(): void {
    this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '') {
      //this.selectedUser.chat.push({
      //  type: 'even',
      //  msg: this.msg,
      //  date: new Date(),
      //});
      this.chatService.sendMessage(this.user.userName, this.selectedUser.from, this.msg);
      this.chatService.saveChatMessage(this.user.userName, this.selectedUser.from, this.msg);
    }

    this.myInput.nativeElement.value = '';
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    header,
    message,
    okText,
    otherText
  ): void {
    this.dialog.open(AppDialogInfoComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        header: header,
        message: message,
        okButtonText: okText,
        otherButtonText: otherText
      }
    });
  }
}
