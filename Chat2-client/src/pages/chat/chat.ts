import { Component, ViewChild, OnInit } from '@angular/core';
import { Content, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { PusherService } from '../../services/pusher';
import { ChatService } from '../../services/chat';
import { PracteraAuthService } from '../../services/auth';
import { Chat } from '../../models/chat';
import { User } from '../../models/user';


declare const Pusher: any;


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage implements OnInit {
  channel: any;
  channelName: string;
  chats: Chat[]=[];
  newChat: Chat;
  chatIn: string = 'General';
  currentUser: User;
  
  @ViewChild("chat") chat: Content;

  constructor(private pusherService: PusherService,
              private navParams: NavParams,
              private authService: PracteraAuthService,
              private chatService: ChatService) {}


  ngOnInit(){
    if(this.navParams.get('chatIn')){
      this.chatIn = this.navParams.get('chatIn');
      this.channelName = 'private-'+this.chatIn;
    }else{
      this.channelName = 'private-General';
    }
      this.channel = this.pusherService.subscribeChannel(this.channelName);


      this.chatService.retrieveHistory(this.channelName);
      this.chatService.chatsChanged.subscribe(
        (chats: Chat[])=>{
          if(chats){
            this.chats = chats;
          }
          console.log(this.chats);
        }
      );

      this.channel.bind('client-message-'+this.channelName, (chat)=>{
        this.chats.push(chat);
      });
      this.chat.scrollToBottom();
  }

  

  onSubmit(form: NgForm) { 
    this.currentUser = this.authService.getActiveUser();
    this.newChat = new Chat(this.currentUser.email, form.value.message)
    this.channel.trigger("client-message-"+this.channelName, this.newChat);
    this.chats.push(this.newChat);
    form.reset();
    this.chat.scrollToBottom();
    this.chatService.storeHistory(this.channelName,this.chats).subscribe();
  }


}
