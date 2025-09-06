export type answerPayload = {
  answerText: string;
  quizId: number;
  isCorrect: boolean;
};

export type answerModel = {
  id: number;
  answerText: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
  quizId: number;
};
