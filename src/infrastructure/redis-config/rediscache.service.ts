import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IORedisKey } from './redis.module';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  /**
   * Get data from redis
   * @param key key to lookup into redis.
   * @returns
   */
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(`${key}`);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  /**
   * Store a value in redis against key
   * @param ctx context regarding which you want to store the key for this creates a namespace in redis.
   * @param key name of key
   * @param value value you want to set
   * @param ttl time to leave for the key
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.redisClient.set(`${key}`, JSON.stringify(value), 'EX', ttl);
  }

  /**
   * Note: use this function to increment the num value stored in redis
   * @param ctx : ctx related to which you are refering the key to
   * @param key : key you intend to increment
   */
  async incr<T>(ctx: string, key: string) {
    try {
      await this.redisClient.incr(`${ctx}:${key}`);
    } catch (error) {
      console.log(`Error while incrementing`, error);
    }
  }

  /**
   *
   * @param ctx :context name for key to be deleted
   * @param key :key name to be deleted from the context
   */
  async delete<T>(ctx: string, key: string): Promise<void> {
    await this.redisClient.del(`${ctx}:${key}`);
  }
}
