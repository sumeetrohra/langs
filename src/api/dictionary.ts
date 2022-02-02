import { collection, getDocs, getFirestore } from "firebase/firestore";
import { IDictionary, ITranslation } from "../types/dictionary";

export const getDictionary = async (): Promise<IDictionary> => {
  const db = getFirestore();

  const dictionarySnapshot = await getDocs(collection(db, "dictionary"));
  let dictionary: IDictionary = {};
  await dictionarySnapshot.forEach((doc) => {
    dictionary[doc.id] = doc.data() as unknown as ITranslation;
  });

  return dictionary;
};
