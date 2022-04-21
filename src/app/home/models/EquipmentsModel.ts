import { questionsModel } from "./QuestionsModel";

export class EquipmentsModel {
    id: string;
    nome: string;
    tag: number;
    status: string;
    perguntas: questionsModel
  }

