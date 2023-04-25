import express, { Router } from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import ExpressQuestionController from './controllers/question-controller';
import {
  QuestionService,
  QuestionRepository,
  AnswerRepository,
} from './domain/question';
import MongoQuestionRepository from './repositories/question-repository';
import DefaultQuestionService from './services/question-service';
import mongoConnection from './servers/mongo-connection';
import redisClient from './servers/redis-connection';
import RedisAnswerRepository from './repositories/answer-repository';

const app = express();
const router = Router();

dotenv.config();

async function main() {
  await mongoConnection();
  await redisClient.connect();
}

main();

app.use(bodyparser.json());
app.use(router);
app.use(express.json());
app.use(router);

const questionRepository: QuestionRepository = new MongoQuestionRepository();
const answerRepository: AnswerRepository = new RedisAnswerRepository(
  redisClient,
  questionRepository
);
const questionService: QuestionService = new DefaultQuestionService(
  answerRepository,
  questionRepository
);
const questionController: ExpressQuestionController =
  new ExpressQuestionController(questionService);

router.post(
  '/question/vote',
  questionController.answerQuestion.bind(questionController)
);
router.get(
  '/question',
  questionController.getQuestion.bind(questionController)
);
router.get(
  '/questions',
  questionController.getQuestions.bind(questionController)
);
router.post(
  '/question',
  questionController.createQuestion.bind(questionController)
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
