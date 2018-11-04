import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController, Alert, Loading, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { MidataService } from '../services/MidataService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = WelcomePage;
  loadingDisplay: Loading;

  constructor(
    app: App,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private midataService: MidataService
  ) {
    splashScreen.show();

    platform.ready()
      .then(() => {

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        // this does not work in the browser.
        // only in cordova, this makes development quite tricky.
        return this.midataService.openSession()
      })
      .then((result) => {
        console.log("openSession => ", result);
        console.log("user", this.midataService.getUser())
        return app.getActiveNav().setRoot(TabsPage)
      })
      .catch((data) => {
        console.error("Failed to open session", data);
      });
  }

  // Helper method. Provide a loading animation
  private getLoadingDisplay(): Loading {
    return this.loadingDisplay = this.loadingCtrl.create({
      content: "Please wait..."
    })
  }

  // Helper method. Provide a popup dialog
  private getPopupDialog(title: string, message: string): Alert {
    return this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
  }
}
