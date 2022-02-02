import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { IQuestion } from "../types/questions";

const useQuestions = (): {
  loadingQuestions: boolean;
  questionsCollection?: IQuestion[];
} => {
  const [questionsCollection, setQuestions] = useState<IQuestion[]>();
  const [loadingQuestions, setLoading] = useState<boolean>(false);

  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLoading(true);
      const questions: IQuestion[] = [];
      querySnapshot.forEach((doc) =>
        questions.push(doc.data() as unknown as IQuestion)
      );
      setLoading(false);
      setQuestions(questions);
    });

    return () => unsubscribe();
  }, []);

  return { loadingQuestions, questionsCollection };
};

export default useQuestions;
