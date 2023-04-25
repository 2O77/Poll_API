import { Request, Response } from 'express';
import { QuestionService } from '../domain/question';

class ExpressQuestionController {
  private questionService: QuestionService;
  constructor(questionsService: QuestionService) {
    this.questionService = questionsService;
  }

  async getQuestions(req: Request, res: Response) {
    const questions = await this.questionService.getQuestions();

    return res.status(200).send(questions);
  }

  async getQuestion(req: Request, res: Response) {
    try {
      const questionId = req.query.questionId;
      if (!questionId) {
        return res.status(400).send('No questionId provided');
      }
      const question = await this.questionService.getQuestion(questionId);
      if (!question) {
        return res.status(404).send('No question found');
      }
      return res.status(200).send(question);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async createQuestion(req: Request, res: Response) {
    try {
      const question = req.body.question;
      const options = req.body.options;

      const createdQuestion = await this.questionService.createQuestion(
        question,
        options
      );

      return res.status(201).send(createdQuestion);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async answerQuestion(req: Request, res: Response) {
    try {
      const questionId = req.query.questionId;
      const optionId = req.query.optionId;

      const option = await this.questionService.answerQuestion(
        questionId,
        optionId
      );

      return res.status(200).send(option);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

export default ExpressQuestionController;
