import { collection } from "firebase/firestore";
import { db } from "../../firebase/app";

export const users = collection(db, "users");
