import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
} from "firebase/firestore";
import { currAuth } from "src/firebase/user";
import { users } from "./collections";

class Dish {
  ref: DocumentReference;
  name = "";
  tags: string[] = [];
  image?: string;
  lastMade = new Date();
  recipe?: DocumentReference;
  link?: string;
  reflect?: boolean;

  constructor(snapshot?: DocumentSnapshot<Omit<Dish, "ref">>) {
    if (snapshot) {
      Object.assign(this, snapshot.data());
      this.ref = snapshot.ref;
    } else {
      this.ref = doc();
    }
  }
}

export let dishes: CollectionReference<Dish> | null = null;

currAuth.subscribe((newUser) => {
  if (newUser) {
    const userDoc = doc(users, newUser.uid);

    dishes = collection(userDoc, "dishes");
    // .withConverter(
    //   recipeHeaderConverter
    // );
  }
});
