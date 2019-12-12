import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room';
import { PracteraAuthService } from '../../services/auth';

@Component({
  selector: 'page-edit-room',
  templateUrl: 'edit-room.html'
})
export class EditRoomPage implements OnInit {
  roomForm: FormGroup;
  mode: string;
  rooms: Room[]=[];
  selectOptions = ['public', 'private'];
  showPassword = false;
  typeColor = 'disabled';
  
  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private roomService: RoomService,
              private authService: PracteraAuthService) {}

ngOnInit() {
  this.mode = this.navParams.get('mode');
  this.initialiseForm();
}

onSelectOption(option){
  this.showPassword = option == 'public' ? false : true;
  if(this.showPassword){
    this.typeColor = 'dark';
  }else if(!this.showPassword){
    this.typeColor = 'disabled';
  }
}


onSubmit(){
   const value = this.roomForm.value;
   let room = new Room(value.title, this.authService.getActiveUser().email, value.description, value.type, value.password);
   
   this.roomService.addRoom(room).subscribe();
 
   this.navCtrl.popToRoot();
  }
  


 private initialiseForm(){
    let title = null;
    let description = null
    let type = 'public';
    let password = null;
    
  this.roomForm = new FormGroup({
          'title': new FormControl(title, Validators.required),
          'description': new FormControl(description),
          'type': new FormControl(type, Validators.required),
          'password': new FormControl(password)
        });
        
    }

}
