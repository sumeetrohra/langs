import { languages } from "./languages";

export interface ITranslation {
  [languages.ENGLISH]: string;
  [languages.GERMAN]: string;
}

export interface IDictionary {
  [key: string]: ITranslation;
}
