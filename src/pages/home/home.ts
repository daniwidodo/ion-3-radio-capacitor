import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';

import { Component, ViewChild } from '@angular/core';
import { Media } from '@ionic-native/media/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController } from 'ionic-angular';
import { ServerPanelProvider } from '../../providers/server-panel/server-panel';
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
    // private media: Media
    // public _social:SocialSharing,
) {
    //
    this.getAppCover();
    //
    this._server.getIceUrl().subscribe(res => {
      this.icecast_url = res[0].icecast_url
      console.log('ice url',this.icecast_url);
    });
    //
    


  }

  ngAfterViewInit() {
    console.log("afterinit");
    this.audio = this._audioRef.nativeElement;
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
    // this.audioUrl = new Audio(audioStream);
    // this.audioUrl = this.media.create(audioStream)
    // this.audioUrl.load();
    // this.audioUrl.play();
    
    
  }

  pauseStreaming(){
    console.log('tombol pause'); 
    
    // this.audioUrl.pause();
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
     
    // this._social.shareWithOptions(options)
    //   .then(()=> {})
    //   .catch(()=>{});
    // console.log('sociall');
  }

}
