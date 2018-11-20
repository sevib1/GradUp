import { Component } from '@angular/core';
import { NavController, MenuController, Nav } from 'ionic-angular';
import { JournalEntryPage } from '../journal-entry/journal-entry';
import { JournalDeletePage } from '../journal-delete/journal-delete';
import { MidataService } from '../../services/MidataService';
import { WelcomeAppexplanationPage } from '../welcome-appexplanation/welcome-appexplanation';


@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {
  //@ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, private midataService: MidataService, private menuCtrl: MenuController) {

  }
  
  public gotoJournalEntryPage() {
    this.navCtrl.push(JournalEntryPage, {});
  }

  public gotoJournalDeletePage() {
    this.navCtrl.push(JournalDeletePage, {});
  }

   // Logout
   logout() {
    this.midataService.logout()
      .then(() => {
        this.menuCtrl.close();
        this.navCtrl.setRoot(WelcomeAppexplanationPage);
      })
      .catch(() => {
        this.navCtrl.setRoot(WelcomeAppexplanationPage);
      })
  }
  

}
