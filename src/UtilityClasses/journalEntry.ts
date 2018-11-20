import { convertUrlToDehydratedSegments } from "ionic-angular/umd/navigation/url-serializer";

export class JournalEntry {

  entryDate: string; //string because of IONIC and ISO 8601
  entryText: string;

  constructor() {
    this.entryDate = "";
    this.entryText = "";
  }

}
