import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private bgMode: BackgroundMode,
    private toast: Toast
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      
    });

    platform.registerBackButtonAction(()=>{
      this.bgMode.enable();
      this.toast.show(`Running on background`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
}

