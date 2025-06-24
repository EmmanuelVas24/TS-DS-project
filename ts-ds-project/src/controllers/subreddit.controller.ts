import {repository} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, requestBody, put, del} from '@loopback/rest';
import {Subreddit} from '../models/subreddit.model';
import {SubredditRepository} from '../repositories/subreddit.repository';
import {PostRepository} from '../repositories/post.repository';
import * as fs from 'fs';
import * as path from 'path';

export class SubredditController {
  constructor(
    @repository(SubredditRepository)
    public subredditRepository : SubredditRepository,
    @repository(PostRepository)
    public postRepository: PostRepository,
  ) {}

  @post('/subreddits')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Subreddit, {exclude: ['id']}),
        },
      },
    })
    subreddit: Omit<Subreddit, 'id'>,
  ): Promise<Subreddit> {
    return this.subredditRepository.create(subreddit);
  }

  @get('/subreddits')
  async find(): Promise<Subreddit[]> {
    return this.subredditRepository.find();
  }

  @get('/subreddits/{id}')
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Subreddit> {
    return this.subredditRepository.findById(id);
  }

  @put('/subreddits/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() subreddit: Subreddit,
  ): Promise<void> {
    await this.subredditRepository.updateById(id, subreddit);
  }

  @del('/subreddits/{id}')
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.subredditRepository.deleteById(id);
  }

  @post('/subreddits/import-subreddits')
  async importSubreddits(): Promise<{imported: number; errors: any[]}> {
    const filePath = path.resolve("C:/Users/vasem/Downloads/realistic_subreddits.json");
    let subreddits: any[] = [];
    let errors: any[] = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      subreddits = JSON.parse(data);
    } catch (err) {
      throw new Error('Failed to read realistic_subreddits.json: ' + err);
    }
    let imported = 0;
    for (const subreddit of subreddits) {
      try {
        await this.subredditRepository.create(subreddit);
        imported++;
      } catch (e) {
        errors.push({subreddit, error: e.message});
      }
    }
    return {imported, errors};
  }

  @get('/subreddits/sub-ids')
  async getAllSubredditIds(): Promise<string> {
    const subreddits = await this.subredditRepository.find({fields: {id: true}});
    const ids = subreddits.map(s => s.id).filter(Boolean);
    return ids.join(',');
  }
}
