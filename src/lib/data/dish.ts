import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  FirestoreDataConverter,
  setDoc,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/app";
import { currAuth } from "../../firebase/user";
import { push } from "svelte-spa-router";
import { OwnedDoc, users } from "./collections";

export class Dish extends OwnedDoc {
  name = "";
  tags: string[] = [];
  image: string | null = null;
  lastMade = new Date();
  recipe: DocumentReference | null = null;
  link = "";
  reflect: boolean = false;

  constructor(
    snapshot?: DocumentSnapshot<
      Omit<Dish, "ref" | "lastMade"> & { lastMade: Timestamp }
    >
  ) {
    super(snapshot?.ref ?? doc(dishes!));

    if (snapshot) {
      const data = snapshot.data();
      Object.assign(this, data);
      this.lastMade = data!.lastMade.toDate();
    }
  }

  open() {
    if (this.link) {
      location.href = this.link;
    } else if (this.recipe) {
      push(`/recipe/${this.owner}/${this.recipe.id}`);
    }
  }

  get imageRef() {
    return ref(storage, `${this.owner.id}/dishImages/${this.ref.id}`);
  }

  async save() {
    await setDoc(this.ref, extractDishData(this));
  }

  deepcopy(): Dish {
    const copied = new Dish();
    return Object.assign(copied, this);
  }
}

function extractDishData({
  image,
  lastMade,
  link,
  name,
  tags,
  reflect,
  recipe,
}: WithFieldValue<Dish>) {
  return {
    image,
    lastMade:
      lastMade instanceof Date ? Timestamp.fromDate(lastMade) : lastMade,
    link,
    tags,
    name,
    recipe,
    reflect,
  };
}

const dishConverter: FirestoreDataConverter<Dish> = {
  toFirestore(dish: WithFieldValue<Dish>) {
    return extractDishData(dish);
  },
  fromFirestore(snapshot) {
    return new Dish(snapshot as any);
  },
};

export let dishes: CollectionReference<Dish> | null = null;

currAuth.subscribe((newUser) => {
  if (newUser) {
    const userDoc = doc(users, newUser.uid);

    dishes = collection(userDoc, "dishes").withConverter(dishConverter);
  }
});
