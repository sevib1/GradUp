import { convertUrlToDehydratedSegments } from "ionic-angular/umd/navigation/url-serializer";

export class JournalEntry {

  entryDate: string; //string because of IONIC and ISO 8601
  entryText: string;
  private entryID: string;

  constructor() {
    this.entryDate = "";
    this.entryText = "";
    this.entryID = ""; //Date with precision in seconds as ID.
  }

  setJournalEntryID(entryID: string){

    this.entryID = entryID;

  }

  getJournalEntryID(): string{

    return this.entryID;
  }


}
