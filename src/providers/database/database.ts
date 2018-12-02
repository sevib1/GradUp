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
  saveJournalEntry(jEntry: JournalEntry): Promise<boolean>{
    console.log("entryId of JournalEntry which is going to be saved: " + jEntry.entryId);
    return this.storage.get(this.journalEntryCollection_key).then(valArr => {
      if (valArr == null) {
        console.log(jEntry + typeof (jEntry));
        let isbarNoteCollection: JournalEntry[] = [];
        isbarNoteCollection.push(jEntry);
        this.storage.set(this.journalEntryCollection_key, isbarNoteCollection);
        console.log("storage--> null");
        return true;
      } else {
        let dublicatedNote = valArr.find(val => val.id == jEntry.entryId)
        if (dublicatedNote != null) {
          console.log("storage-->find dublicate" + dublicatedNote.id);
          this.deleteJournalEntryById(dublicatedNote.id).then(val => {
            if (val) {
              this.storage.get(this.journalEntryCollection_key).then(valArrWithoutDublicate => {
                let isbarNoteCollection: JournalEntry[] = valArrWithoutDublicate;
                isbarNoteCollection.push(jEntry);
                this.storage.set(this.journalEntryCollection_key, isbarNoteCollection);
                return true;
              });
            }
          });
        } else {
          console.log("storage--> got valArr");
          let isbarNoteCollection: JournalEntry[] = valArr;
          isbarNoteCollection.push(jEntry);
          this.storage.set(this.journalEntryCollection_key, isbarNoteCollection);
          return true;
        }
      }
      return true;
    });
  }
  //old version
  /*saveJournalEntry(entries: JournalEntry[]):void {
    this.storage.set(this.journalEntryCollection_key, entries);
    console.log("save entry: " + entries);
  }*/

  deleteJournalEntryById(id: number): Promise<boolean> {
    return this.storage.get(this.journalEntryCollection_key).then((valArr) => {
      let newArr = valArr.filter(val => val.entryId != id); //true -> wird in newArr geschrieben
      this.storage.set(this.journalEntryCollection_key, newArr);
      return true;
    });
  }

  getJournalEntryById(id: number): Promise<JournalEntry> {
    return this.storage.get(this.journalEntryCollection_key).then((valArr) => {
      return valArr.find(JournalEntry => JournalEntry.entryId == id);
    });
      }

  //get all journal entries
  getJournalEntryCollection(): Promise<JournalEntry[]> {
    return this.storage.get(this.journalEntryCollection_key);
  }

}
