import { ITranslation } from "./dictionary";
import { languages } from "./languages";

export interface IQuestion {
  [languages.ENGLISH]: string;
  [languages.GERMAN]: string;
  answerId: string;
  correctAnswer?: ITranslation;
  answerOptions: ITranslation[];
}
