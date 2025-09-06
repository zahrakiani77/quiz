export type quiz = {
  id: number;
  question: string;
  createdAt: string;
  updatedAt: string;
  answers: [];
};

export type quizPayload = {
  question: string;
};
