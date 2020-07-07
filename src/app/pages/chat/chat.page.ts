
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;

  public chat: any;
  public chatCfg: any;
  public msg: string;
  public user: any;
  loading = false;
  index = null;

  constructor(
    private authService: AuthService,
    private navParams: NavParams,
    private modal: ModalController,
    private chatService: ChatService) { }

  ngOnInit() {
    this.chatCfg = this.navParams.get('chat');
    this.loading = true;
    this.chatService.getChat(this.chatCfg.id).subscribe(chat => {
      this.loading = false;
      console.log(chat);
      this.chat = chat;
    });
    this.getCurrentUser();
  }

  getCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.user = firebase.auth().currentUser;
  }

  closeModal() {
    this.modal.dismiss();
  }

  sendMensaje() {
    if (this.msg !== '' && this.msg.length < 22) {
      const message = {
        text: this.msg,
        created_at: Date.now(),
        user: {
          id: this.user.uid,
          mail: this.user.email
        }
      };
      this.chat.messages.push(message);
      this.content.scrollToBottom(0);
      this.chatService.sendMessage(this.chat, this.chatCfg.id);
      this.msg = '';
    }
  }

  updateScroll(index) {
    if (index !== this.index) {
      this.index = index;
      console.log('entre');
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 1000);
    }
  }

}
