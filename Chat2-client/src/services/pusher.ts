import { Chat } from '../models/chat';

declare const Pusher: any;

export class PusherService {
    pusher: any;
    chat: Chat;
    chats: Chat[]=[];
    constructor() {
        this.pusher = new Pusher( '85d5d463074afae9e75f', {authEndpoint:'http://localhost:3000/pusher/auth'});

    }
     subscribeChannel(name: string) {
        return this.pusher.subscribe(name);
    }

    unsubscribeChannel(name: string) {
        return this.pusher.unsubscribe(name);
    }

    
}