import { collection, DocumentReference } from "firebase/firestore";
import { db } from "../../firebase/app";

export const users = collection(db, "users");

export class OwnedDoc {
  constructor(public ref: DocumentReference) {}

  get owner() {
    return this.ref.parent.parent!;
  }
}
