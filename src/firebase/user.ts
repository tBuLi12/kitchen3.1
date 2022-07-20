import { authState } from "rxfire/auth";
import { auth } from "./app";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as firebaseSingOut,
  User,
} from "firebase/auth";
import { BehaviorSubject } from "rxjs";

getRedirectResult(auth);

const provider = new GoogleAuthProvider();

export const currAuth = new BehaviorSubject<User | null | undefined>(undefined);
authState(auth).subscribe(currAuth);

export function signOut() {
  firebaseSingOut(auth);
}

export function redirectToLogin() {
  signInWithRedirect(auth, provider);
}
