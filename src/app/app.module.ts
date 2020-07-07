import {
  NgModule, LOCALE_ID
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouteReuseStrategy
} from '@angular/router';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';


/* -------------------------------------------------------------------------- */
/*                                 AngularFire                                */
/* -------------------------------------------------------------------------- */
import {
  AngularFireModule
} from '@angular/fire';
import {
  AngularFireDatabaseModule
} from '@angular/fire/database';
import {
  AngularFirestoreModule
} from '@angular/fire/firestore';
import {
  AngularFireFunctions
} from '@angular/fire/functions';
import {
  credentials
} from './../credentials';
import {
  AngularFireAuthGuard
} from '@angular/fire/auth-guard';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { SplashScreenPage } from './splash-screen/splash-screen.page';
import { ChatPage } from './pages/chat/chat.page';
import { FormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [AppComponent, SplashScreenPage, ChatPage, TimeAgoPipe, MomentPipe],
  entryComponents: [
    SplashScreenPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    /* ------------------------------ Angular fire ------------------------------ */
    AngularFireModule.initializeApp(credentials.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [
    /* ------------------------------ Angular fire ------------------------------ */
    AngularFireAuthGuard,
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
