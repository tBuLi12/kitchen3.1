import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  FirestoreDataConverter,
  getDoc,
  setDoc,
  WithFieldValue,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase/app";
import { currAuth } from "../../firebase/user";
import { getPreferringCache } from "../../firebase/utils";
import { push } from "svelte-spa-router";
import { users } from "./collections";
// import { getPreferringCache } from "src/firebase/utils";

export class RecipeHeader {
  ref: DocumentReference;
  name = "";
  description = "";
  tags: string[] = [];
  image: string | null = null;
  link: string | null = null;

  constructor(snapshot?: DocumentSnapshot<Omit<RecipeHeader, "ref">>) {
    if (snapshot) {
      Object.assign(this, snapshot.data());
      this.ref = snapshot.ref;
    } else {
      this.ref = doc(headers!);
    }
  }

  get owner() {
    return this.ref.parent.parent!;
  }

  get bodyRef() {
    return doc(this.owner, "recipes", this.ref.id);
  }

  get imageRef() {
    return ref(storage, `${this.owner.id}/recipeImages/${this.ref.id}`);
  }

  async delete() {
    deleteObject(this.imageRef).catch(() => null);

    const batch = writeBatch(db);

    batch.delete(this.ref);
    batch.delete(this.bodyRef);

    await batch.commit();
  }

  copyForCurrentUser() {
    this.ref = doc(headers!);
    return this;
  }

  open() {
    if (this.link) {
      location.href = this.link;
    } else {
      push(`/recipe/${this.owner.id}/${this.ref.id}`);
    }
  }
}

export type Ingredient = {
  name: string;
} & (
  | { amount: number; unit?: string }
  | { weight: number }
  | { volume: number }
);

export interface RecipeBody {
  text: string;
  portions: number;
  ingredients: Ingredient[];
}

export class Recipe extends RecipeHeader implements RecipeBody {
  text = "";
  portions = 1;
  ingredients: Ingredient[] = [];

  constructor(snapshot?: DocumentSnapshot<Omit<RecipeHeader, "ref">>) {
    super(snapshot);
  }

  static async fetch(recipeId: string, userId?: string): Promise<Recipe> {
    let headerProm;
    let bodyProm;

    if (userId) {
      const userDoc = doc(users, userId);

      headerProm = getDoc(doc(userDoc, "headers", recipeId));
      bodyProm = getDoc(doc(userDoc, "recipes", recipeId));
    } else {
      headerProm = getPreferringCache(doc(headers!, recipeId));
      bodyProm = getDoc(doc(bodies!, recipeId));
    }

    const [headerSnap, bodySnap] = await Promise.all([headerProm, bodyProm]);

    const recipe = new Recipe(headerSnap as any);
    Object.assign(recipe, bodySnap);

    return recipe;
  }

  async save() {
    if (this.link) {
      await setDoc(this.ref, extractHeaderData(this));
    } else {
      const batch = writeBatch(db);
  
      batch.set(this.ref, extractHeaderData(this));
      batch.set(this.bodyRef, extractBodyData(this));
  
      await batch.commit();
    }
  }
}

function extractHeaderData({
  name,
  description,
  tags,
  image,
  link,
}: WithFieldValue<RecipeHeader>) {
  return { name, description, tags, image, link };
}

function extractBodyData({ text, ingredients, portions }: Recipe) {
  return { text, ingredients, portions };
}

const recipeHeaderConverter: FirestoreDataConverter<RecipeHeader> = {
  toFirestore(header: WithFieldValue<RecipeHeader>) {
    return extractHeaderData(header);
  },
  fromFirestore(snapshot) {
    return new RecipeHeader(snapshot as any);
  },
};

export let headers: CollectionReference<RecipeHeader> | null = null;
let bodies: CollectionReference<RecipeBody> | null = null;

currAuth.subscribe((newUser) => {
  if (newUser) {
    const userDoc = doc(users, newUser.uid);

    headers = collection(userDoc, "headers").withConverter(
      recipeHeaderConverter
    );

    bodies = collection(userDoc, "bodies") as CollectionReference<RecipeBody>;
  }
});
