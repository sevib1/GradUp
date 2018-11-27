import { Injectable } from '@angular/core';

// import storage
import { Storage } from '@ionic/storage';

import { JournalEntry } from '../../classes/journalEntry';

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
  constructor(public storage: Storage) {
    console.log('Hello DatabaseProvider Provider');
  }

  //save journal entry
  saveJournalEntry(entries: JournalEntry[]):void {
    this.storage.set(this.journalEntryCollection_key, entries);
    console.log("save entry: " + entries);
  }

  deleteJournalEntryById(id: number): Promise<boolean> {
    return this.storage.get(this.journalEntryCollection_key).then((valArr) => {
      let newArr = valArr.filter(jEntry => jEntry.entryId != id); //true -> wird in newArr geschrieben
      this.storage.set(this.journalEntryCollection_key, newArr);
      return true;
    });
  }

  getJournalEntryById(id: number): Promise<JournalEntry> {
    return this.storage.get(this.journalEntryCollection_key).then((valArr) => {
      return valArr.find(JournalEntry => JournalEntry.id == id);
      
    });
    
  }

  //get all journal entries
  getJournalEntryCollection(): Promise<JournalEntry[]> {
    return this.storage.get(this.journalEntryCollection_key);
  }

}
