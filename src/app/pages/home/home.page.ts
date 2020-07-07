import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { ModalController } from '@ionic/angular';
import { ChatPage } from 'src/app/pages/chat/chat.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.user = firebase.auth().currentUser;
  }

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  openChat(idChat) {
    const obj = {
      id: idChat,
      name: (idChat === 'pps4a') ? 'PPS-4A' : 'PPS-4B',
      theme: (idChat === 'pps4a') ? 'warning' : 'secondary'
    };
    this.modalCtrl.create({
      component: ChatPage,
      componentProps: {
        chat: obj
      }
    }).then((modal) => modal.present());
  }

}
