import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient: RedisClientType = createClient({
  url: 'redis://redis-11551.c250.eu-central-1-1.ec2.cloud.redislabs.com:11551',
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});
export default redisClient;
