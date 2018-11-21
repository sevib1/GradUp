import { Injectable } from '@angular/core';

// import storage
import { Storage } from '@ionic/storage';

import { JournalEntry } from '../../UtilityClasses/journalEntry';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  // journalEntry key
  journalEntryCollection_key: string = 'journalEntryCollection';

  //dbp = databaseprovider of type (ionic) storage
  constructor(public dbp: Storage) {
    console.log('Hello DatabaseProvider Provider');
  }

  //save journal entry
  saveJournalEntry(entries: JournalEntry[]):void {
    this.dbp.set(this.journalEntryCollection_key, entries);
    console.log("save entry: " + entries);
  }

  deleteJournalEntry(entries: JournalEntry[]):void {
    
  }

  //get all journal entries
  getJournalEntryCollection(): Promise<JournalEntry[]> {
    return this.dbp.get(this.journalEntryCollection_key);
  }

}
