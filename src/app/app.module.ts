import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { JournalPage } from '../pages/journal/journal';
import { InformationPage } from '../pages/information/information';
import { HelpPage } from '../pages/help/help';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TitleLogoComponent } from '../components/title-logo/title-logo';

@NgModule({
  declarations: [
    MyApp,   

    // pages
    TabsPage,
    JournalPage,
    InformationPage,
    HelpPage,
    ProfilePage,

    // components
    TitleLogoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    JournalPage,
    InformationPage,
    HelpPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}


