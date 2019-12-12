import { Injectable, EventEmitter } from '@angular/core';
import { Response, Http } from '@angular/http';
import 'rxjs/Rx';

import { Chat } from '../models/chat';

@Injectable()
export class ChatService{
    chats: Chat[]=[];
    chatsChanged = new EventEmitter<Chat[]>();

    constructor(private http: Http){}

    retrieveHistory(channelName: string){
        console.log('called');
   return this.http.get('https://ionic2-rooms.firebaseio.com/'+channelName+'.json')
        .map((res: Response)=>{
            return res.json();
        })
        .subscribe((data: Chat[]) => {
            this.chats = data;
            this.chatsChanged.emit(this.chats);
      
        });
  }

  storeHistory(channelName: string, chats: Chat[]){
      console.log('storeHistory called');
      console.log(chats);
        const body = JSON.stringify(chats);
        return this.http.put('https://ionic2-rooms.firebaseio.com/'+channelName+'.json', body)
        .map((res:Response)=>{
            return res.json();
        });  
  }
}