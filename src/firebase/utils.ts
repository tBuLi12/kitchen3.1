import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocFromCache,
} from "firebase/firestore";

export async function getPreferringCache<T>(
  ref: DocumentReference<T>
): Promise<DocumentSnapshot<T>> {
  return await getDocFromCache(ref).catch(() => getDoc(ref));
}
