import { Component } from '@angular/core';
import { RoomPage } from '../../pages/room/room';
import { ChatPage } from '../../pages/chat/chat';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  roomPage = RoomPage;
  chatPage = ChatPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
