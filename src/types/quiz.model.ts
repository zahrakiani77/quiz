export type QuizModel = {
  id: number;
  question: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  answerText: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
};
