import {
  Option,
  Question,
  QuestionService,
  AnswerRepository,
  QuestionRepository,
  QuestionResponse,
} from '../domain/question';

class DefaultQuestionService implements QuestionService {
  private answerRepository: AnswerRepository;
  private questionRepository: QuestionRepository;

  constructor(
    answerRepository: AnswerRepository,
    questionRepository: QuestionRepository
  ) {
    this.answerRepository = answerRepository;
    this.questionRepository = questionRepository;
  }

  async getQuestions(): Promise<Question[]> {
    return Promise.resolve(this.questionRepository.getQuestions());
  }

  async getQuestion(id: string): Promise<Question> {
    const question = await this.questionRepository.getQuestion(id);

    if (!question) {
      throw new Error('No question found');
    }

    return Promise.resolve(question);
  }

  async createQuestion(text: string, options: []): Promise<Question> {
    if (!text) {
      throw new Error('No text provided');
    }

    if (!options.length) {
      throw new Error('No options provided');
    }

    const question = await this.questionRepository.createQuestion(
      text,
      options
    );

    if (!question) {
      throw new Error('No question found');
    }

    return Promise.resolve(question);
  }

  async answerQuestion(
    questionId: string,
    optionId: number
  ): Promise<QuestionResponse> {
    const votedOption = await this.answerRepository.answerQuestion(
      questionId,
      optionId
    );

    if (!votedOption) {
      throw new Error('No option found');
    }

    return Promise.resolve(votedOption);
  }
}

export default DefaultQuestionService;
