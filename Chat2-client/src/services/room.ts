import { Injectable, EventEmitter } from '@angular/core';
import { Response, Http } from '@angular/http';
import 'rxjs/Rx';

import { Room } from '../models/room';

@Injectable()
export class RoomService {
    rooms: Room[]=[];
    roomsChanged = new EventEmitter<Room[]>();
    

    constructor(private http: Http){}
    
    addRoom(room: Room){
        this.rooms.push(room);
        const body = JSON.stringify(this.rooms);
        return this.http.put('https://ionic2-rooms.firebaseio.com/rooms.json', body)
        .map((res:Response)=>{
            return res.json();
        });  
    }

    deleteRoom(index: number){  
        this.rooms.splice(index, 1);
        const body = JSON.stringify(this.rooms);
        return this.http.put('https://ionic2-rooms.firebaseio.com/rooms.json', body)
            .map((res:Response)=>{
                return res.json();
         });  
    }

    getRooms(){
        //http Get
        return this.http.get('https://ionic2-rooms.firebaseio.com/rooms.json')
        .map((res: Response)=>{
            return res.json();
        })
        .subscribe((data: Room[]) => {
            this.rooms = data;
            this.roomsChanged.emit(this.rooms);
        });
    }

   
}