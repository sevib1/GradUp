import { Component } from '@angular/core';

import { JournalPage } from '../journal/journal';
import { InformationPage } from '../information/information';
import { HelpPage } from "../help/help";
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JournalPage;
  tab2Root = InformationPage;
  tab3Root = HelpPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
