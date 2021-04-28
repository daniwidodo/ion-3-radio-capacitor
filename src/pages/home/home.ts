import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Component, ViewChild } from '@angular/core';

import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController } from 'ionic-angular';
import { ServerPanelProvider } from '../../providers/server-panel/server-panel';

const {Share} = Plugins;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("audioElement")
  public _audioRef:  ElementRef;
  private audio: HTMLMediaElement;


  showButton:boolean;
  app_cover_data:any[]=[];
  icecast_url:any;

  audioUrl:any;
  audioStream:string;


  constructor(    
    public navCtrl: NavController,
    public http: HttpClient,
    private _server:ServerPanelProvider,
   
    private _social: SocialSharing,
) {
    
    //
    this.getAppCover();
    //
    this._server.getIceUrl().subscribe(res => {
      this.icecast_url = res[0].icecast_url
      console.log('ice url',this.icecast_url);
    });
    


  }

  async basicShare(){
    await Share.share({
      title: 'judul',
      text: 'wakwaww',
      url: 'https://facebook.com'
    })
  }

  ngAfterViewInit() {
    console.log("afterinit");
    this.audio = this._audioRef.nativeElement;
    //
    
  }

  getAppCover(){
    this._server.getCoverUrl().subscribe(res => {
      
      this.app_cover_data = res[0].cover_aplikasi;
      console.log('data dari server:',this.app_cover_data);
    });   
  } 

  playStreaming(){
    console.log('tombol play');
    this.audio.play();
    this.showButton = false;

  }

  pauseStreaming(){
    console.log('tombol pause'); 
    this.showButton = true;
    this.audio.pause();
    
  }

  pauseAudio(){
    this.audio.pause();
  }

  socialShare(){
    // let options = {
    //   message: 'Bagikan', // not supported on some apps (Facebook, Instagram)
    //   subject: 'the subject', // fi. for email
    //   files: ['', ''], // an array of filenames either locally or remotely
    //   url: 'https://facebook.com/',
    //   chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    // }
     
    this._social.share("Bagikan!", 'SUBJECT',null,'http://facebook.com')
      .then(()=> {})
      .catch(()=>{});
    console.log('sociall');
  }

}
