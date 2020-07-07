import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }

  getChats() {
    return this.db.collection('chats').snapshotChanges().pipe(map(chat => {
      return chat.map((a: any) => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getChat(id: any) {
    return this.db.collection('chats').doc(id).valueChanges();
  }

  sendMessage(data: any, id: any) {
    console.log(data, id);
    return this.db.collection('chats').doc(id).set(data);
  }
}
