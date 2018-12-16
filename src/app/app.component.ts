import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController, Alert, Loading, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { MidataService } from '../services/MidataService';
import { WelcomePage } from '../pages/welcome/welcome';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = WelcomePage;
  loadingDisplay: Loading;

  constructor(
    private app: App,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private midataService: MidataService,
    private storage: Storage
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
        console.log("appComponent() : openSession success", result);
        console.log("appComponent() : midata user", this.midataService.getUser());
        this.gotoJournalPage();
      })
      .catch((result) => {
        console.log("appComponent() : openSession failed", result);

        this.storage.get("username").then((username: any) => {
          console.log("appComponent() : storage username:=", username);
          if (username) {
            // => So it would be correct, it is checked whether a user name is already set. If yes, it goes directly to the diary page. For demonstration purposes the start is at the welcome page.
            // this.gotoJournalPage(); 
          }
        });
      });
  }

  private gotoJournalPage() {
    console.log("gotoJournalPage()");
    this.app.getActiveNav().setRoot(TabsPage);
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
