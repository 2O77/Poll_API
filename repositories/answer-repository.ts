import { Question, AnswerRepository } from '../domain/question';
import { Option } from '../domain/question';
import { RedisClientType } from 'redis';
import MongooseQuestionRepository from './question-repository';
import { QuestionResponse } from '../domain/question';

class RedisQuestionRepository implements AnswerRepository {
  private redisClient: RedisClientType;
  private questionRepository: MongooseQuestionRepository;

  constructor(
    redisClient: RedisClientType,
    questionRepository: MongooseQuestionRepository
  ) {
    this.redisClient = redisClient;
    this.questionRepository = questionRepository;
  }

  async answerQuestion(
    questionId: string,
    optionId: number
  ): Promise<QuestionResponse> {
    let key = `question:${questionId}:option:${optionId}:votes`;
    let result = await this.redisClient.get(key);

    if (result === undefined || result === null) {
      const question = await this.questionRepository.getQuestion(questionId);

      if (!question) {
        throw new Error('No question found');
      }

      const votedOption = question.options[optionId];

      if (!votedOption) {
        throw new Error('No option found');
      }
    }

    await this.redisClient.incr(key);

    const optionVotesKeys = await this.redisClient.keys(
      `question:${questionId}:option:*:votes`
    );
    const optionVotes = await Promise.all(
      optionVotesKeys.map(async (key) => {
        const optionId = key.split(':')[3];
        const votes = await this.redisClient.get(key);
        return { optionId, votes };
      })
    );

    const poll = {
      questionId,
      optionId,
      votes: optionVotes as [{ optionId: string; votes: string }],
    };

    return Promise.resolve(poll);
  }
}

export default RedisQuestionRepository;
