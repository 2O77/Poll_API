interface Option {
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  createdAt: Date;
}

interface QuestionResponse {
  questionId: string;
  optionId: number;
  votes: [{ optionId: string; votes: string }];
}

interface QuestionService {
  getQuestions(): Promise<Question[]>;
  getQuestion(id: string): Promise<Question>;
  createQuestion(text: string, options: Option[]): Promise<Question>;
  answerQuestion(
    questionId: string,
    optionId: number
  ): Promise<QuestionResponse>;
}

interface QuestionRepository {
  getQuestions(): Promise<Question[]>;
  getQuestion(id: string): Promise<Question>;
  createQuestion(text: string, options: Option[]): Promise<Question>;
}

interface AnswerRepository {
  answerQuestion(question: string, option: number): Promise<QuestionResponse>;
}

export {
  Question,
  Option,
  QuestionService,
  QuestionRepository,
  AnswerRepository,
  QuestionResponse,
};
