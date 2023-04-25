import { Option, Question, QuestionRepository } from '../domain/question';
import { Question as QuestionModel } from '../models/question-model';

class MongooseQuestionRepository implements QuestionRepository {
  async getQuestions(): Promise<Question[]> {
    const questions = await QuestionModel.find({});
    return questions.map((question) => ({
      id: question.id,
      text: question.text,
      options: question.options,
      createdAt: question.createdAt,
    }));
  }

  async getQuestion(id: string): Promise<Question | null> {
    const question = await QuestionModel.findById(id);

    if (!question) {
      return null;
    }
    return {
      id: question.id,
      text: question.text,
      options: question.options,
      createdAt: question.createdAt,
    };
  }

  async createQuestion(text: string, options: Option[]): Promise<Question> {
    const question = await QuestionModel.create({
      text,
      options,
      createdAt: new Date(),
    });
    return {
      id: question.id,
      text: question.text,
      options: question.options,
      createdAt: question.createdAt,
    };
  }
}

export default MongooseQuestionRepository;
