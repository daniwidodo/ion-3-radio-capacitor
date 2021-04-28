import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerPanelProvider } from '../../providers/server-panel/server-panel';
import { MusicControls } from '@ionic-native/music-controls';
import { BackgroundMode } from '@ionic-native/background-mode';



const {Share, Toast} = Plugins;
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
    private musicControls: MusicControls,
    private backgroundMode: BackgroundMode
) {
    
    //
    this.getAppCover();
    //
    this._server.getIceUrl().subscribe(res => {
      this.icecast_url = res[0].icecast_url
      console.log('ice url',this.icecast_url);
    });
    //
    this.backgroundMode.enable();

    
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
    this.doMusicControls();
  }

  doMusicControls(){
    this.musicControls.create({
      track       : 'Time is Running Out',        // optional, default : ''
      artist      : 'Muse',                       // optional, default : ''
      cover       : 'albums/absolution.jpg',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : true,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
    
    // iOS only, optional
      album       : 'Absolution',     // optional, default: ''
      duration : 60, // optional, default: 0
      elapsed : 10, // optional, default: 0
      hasSkipForward : true,  // show skip forward button, optional, default: false
      hasSkipBackward : true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional
    
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker    : 'Now playing "Time is Running Out"',
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
     });
    
     this.musicControls.subscribe().subscribe(action => {
    
       function events(action) {
         const message = JSON.parse(action).message;
             switch(message) {
                 case 'music-controls-next':
                     // Do something
                     break;
                 case 'music-controls-previous':
                     // Do something
                     break;
                 case 'music-controls-pause':
                     // Do something
                     break;
                 case 'music-controls-play':
                     // Do something
                     break;
                 case 'music-controls-destroy':
                     // Do something
                     break;
    
             // External controls (iOS only)
             case 'music-controls-toggle-play-pause' :
                     // Do something
                     break;
             case 'music-controls-seek-to':
               const seekToInSeconds = JSON.parse(action).position;
               this.musicControls.updateElapsed({
                 elapsed: seekToInSeconds,
                 isPlaying: true
               });
               // Do something
               break;
             case 'music-controls-skip-forward':
               // Do something
               break;
             case 'music-controls-skip-backward':
               // Do something
               break;
    
                 // Headset events (Android only)
                 // All media button events are listed below
                 case 'music-controls-media-button' :
                     // Do something
                     break;
                 case 'music-controls-headset-unplugged':
                     // Do something
                     break;
                 case 'music-controls-headset-plugged':
                     // Do something
                     break;
                 default:
                     break;
             }
         }
        });
    
     this.musicControls.listen(); // activates the observable above
    
     this.musicControls.updateIsPlaying(true);
  }

  getAppCover(){
    this._server.getCoverUrl().subscribe(res => {
      
      this.app_cover_data = res[0].cover_aplikasi;
      console.log('data dari server:',this.app_cover_data);
    });   
  } 

  async playStreaming(){
    console.log('tombol play');
    this.audio.play();
    this.showButton = false;

    await Toast.show({
      text: 'Yahoo!'

    });

  }

  pauseStreaming(){
    console.log('tombol pause'); 
    this.showButton = true;
    this.audio.pause();
    
  }

  pauseAudio(){
    this.audio.pause();
  }



}
