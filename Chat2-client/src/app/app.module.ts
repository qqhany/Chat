import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatPage } from '../pages/chat/chat';
import { RoomPage } from '../pages/room/room';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { SigninPage } from '../pages/signin/signin';
import { EditRoomPage } from '../pages/edit-room/edit-room';
import { PusherService } from '../services/pusher';
import { RoomService } from '../services/room';
import { ChatService } from '../services/chat';
import { PracteraAuthService } from '../services/auth';


@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    RoomPage,
    TabsPage,
    SettingsPage,
    AccountPage,
    SigninPage,
    EditRoomPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    RoomPage,
    TabsPage,
    SettingsPage,
    AccountPage,
    SigninPage,
    EditRoomPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  PusherService,
  RoomService,
  ChatService,
  PracteraAuthService
  ]
})
export class AppModule {}
