import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { WelcomePage } from '../pages/welcome/welcome';
import { WelcomePrivacyPage } from '../pages/welcome-privacy/welcome-privacy';
import { WelcomePrivacy2Page } from '../pages/welcome-privacy2/welcome-privacy2';
import { WelcomeTermsPage } from '../pages/welcome-terms/welcome-terms';
import { WelcomeTerms2Page } from '../pages/welcome-terms2/welcome-terms2';
import { WelcomeCapturePage } from '../pages/welcome-capture/welcome-capture';
import { WelcomeContactPage } from '../pages/welcome-contact/welcome-contact';
import { WelcomeContact2Page } from '../pages/welcome-contact2/welcome-contact2';
import { WelcomeContact3Page } from '../pages/welcome-contact3/welcome-contact3';
import { WelcomeConnectPage } from '../pages/welcome-connect/welcome-connect';
import { WelcomeConnect2Page } from '../pages/welcome-connect2/welcome-connect2';
import { WelcomeConnect3Page } from '../pages/welcome-connect3/welcome-connect3';

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
    WelcomePage,
    WelcomePrivacyPage,
    WelcomePrivacy2Page,
    WelcomeTermsPage,
    WelcomeTerms2Page,
    WelcomeCapturePage,
    WelcomeContactPage,
    WelcomeContact2Page,
    WelcomeContact3Page,
    WelcomeConnectPage,
    WelcomeConnect2Page,
    WelcomeConnect3Page,
    
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
    WelcomePage,
    WelcomePrivacyPage,
    WelcomePrivacy2Page,
    WelcomeTerms2Page,
    WelcomeTermsPage,
    WelcomeCapturePage,
    WelcomeContactPage,
    WelcomeContact2Page,
    WelcomeContact3Page,
    WelcomeConnectPage,
    WelcomeConnect2Page,
    WelcomeConnect3Page,
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


