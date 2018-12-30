import { convertUrlToDehydratedSegments } from "ionic-angular/umd/navigation/url-serializer";

export class JournalEntry {

  entryId: number;
  entryDate: Date; // deprecated -> string because of IONIC and ISO 8601
  entryText: string;
  entryPhoto: any;
  

  constructor() {
    this.entryDate = new Date();
    this.entryText = "";
    this.entryPhoto= "";

    //does not work! -> work around in journal-entry.ts
    this.entryId = 0; //this.entryDate.getTime(); //sets the amount of milliseconds since 1970 as id
  }

  /*setJournalEntryID(entryID: string){

    this.entryID = entryID;

  }

  getJournalEntryID(): string{

    return this.entryID;
  }*/


}
