import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { UserProfilePage } from '../user-profile/user-profile';


@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {
  postPicture: any = null;
  eventName: string;
  eventcaption: string;
  eventHashtags: string;

  constructor(public navCtrl: NavController, public eventData: EventProvider, public cameraPlugin: Camera) {}

  createEvent(eventName: string,  eventCaption: string, eventHashtags: string) {
    this.eventData.createEvent(eventName, eventCaption, eventHashtags,this.postPicture).then( () => {
     this.navCtrl.push(UserProfilePage);

    });
  }


    takePicture(){
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.postPicture = 'data:image/jpeg;base64,'+ imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
