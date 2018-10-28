import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { JournalPage } from '../pages/journal/journal';

import { InformationPage } from '../pages/information/information';
import { InformationAnorexiaPage } from '../pages/information-anorexia/information-anorexia';
import { InformationConsequencesPage } from '../pages/information-consequences/information-consequences';
import { InformationPsychePage } from '../pages/information-psyche/information-psyche';
import { InformationAnatomyPage } from '../pages/information-anatomy/information-anatomy';

import { HelpPage } from '../pages/help/help';

import { ProfilePage } from '../pages/profile/profile';
import { ProfileImpressumPage } from '../pages/profile-impressum/profile-impressum';
import { ProfilePrivacyPage } from '../pages/profile-privacy/profile-privacy';
import { ProfileTermsPage } from '../pages/profile-terms/profile-terms';

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
    InformationAnorexiaPage,
    InformationConsequencesPage,
    InformationPsychePage,
    InformationAnatomyPage,
    HelpPage,
    ProfilePage,
    ProfileImpressumPage,
    ProfilePrivacyPage,
    ProfileTermsPage,

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
    InformationAnorexiaPage,
    InformationConsequencesPage,
    InformationPsychePage,
    InformationAnatomyPage,
    HelpPage,
    ProfilePage,
    ProfileImpressumPage,
    ProfilePrivacyPage,
    ProfileTermsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}


