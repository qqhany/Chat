import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Room } from '../../models/room';
import { EditRoomPage } from '../../pages/edit-room/edit-room';
import { ChatPage } from '../../pages/chat/chat';
import { RoomService } from '../../services/room';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage implements OnInit{
  rooms: Room[]=[];
  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private roomService: RoomService,
              private alertCtrl: AlertController) {}

  ngOnInit(){
    this.roomService.getRooms();
    this.roomService.roomsChanged.subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
        console.log(this.rooms);
      }
    );
 }             

  onNewRoom(){
    this.navCtrl.push(EditRoomPage, {mode: 'New'});
  }


  onDeleteRoom(i:number){
    this.roomService.deleteRoom(i).subscribe();
  }

  openChat(room: Room){
   console.log(room.type);
    if(room.type == 'public'){
      this.navCtrl.push(ChatPage, {chatIn: room.title});
    }else if(room.type == 'private'){
      let prompt = this.alertCtrl.create({
        title: 'Authorisation',
        message: "Please enter the password to use the chat room",
        inputs: [
        {
          name: 'password',
          placeholder: 'password'
        },
        ],
        buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log(data);
            if(data.password == room.password){
              this.navCtrl.push(ChatPage, {chatIn: room.title});
            }else{
              alert('Error! Unauthorised user!');
            }
              }
            }
          ]
        });
      prompt.present();
    }
  }

}
