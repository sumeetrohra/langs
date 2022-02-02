import { IDictionary, ITranslation } from "../types/dictionary";

const shuffle = (arr: any[]) =>
  arr.sort(() => Math.random() - Math.random()).slice(0, 4);

export const getRandomOptions = (
  dictionary: IDictionary,
  answerId: string
): ITranslation[] => {
  // const optionsArr = Object.values(dictionary).filter(
  //   (option) => option.english !== answer.english
  // );
  // let random = shuffle(optionsArr);
  // random = [...random, answer];
  // return shuffle(random);
  const optionsArr = Object.keys(dictionary).filter((key) => key !== answerId);
  let random = shuffle(optionsArr);
  random.push(answerId);
  return shuffle(random).map((key) => dictionary[key]);
};
