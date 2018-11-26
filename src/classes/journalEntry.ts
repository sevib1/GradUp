import { convertUrlToDehydratedSegments } from "ionic-angular/umd/navigation/url-serializer";

export class JournalEntry {

  entryDate: Date; // deprecated -> string because of IONIC and ISO 8601
  entryText: string;
  entryId: number;

  constructor() {
    this.entryDate = new Date();
    this.entryText = "";
    this.entryId = this.entryDate.getTime(); //sets the amount of milliseconds since 1970 as id
  }

  /*setJournalEntryID(entryID: string){

    this.entryID = entryID;

  }

  getJournalEntryID(): string{

    return this.entryID;
  }*/


}
