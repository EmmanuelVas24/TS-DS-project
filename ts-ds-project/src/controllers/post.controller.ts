import {repository} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, requestBody, put, del, patch} from '@loopback/rest';
import {Post} from '../models/post.model';
import {PostRepository} from '../repositories/post.repository';
import * as fs from 'fs';
import * as path from 'path';

export class PostController {
  constructor(
    @repository(PostRepository)
    public postRepository : PostRepository,
  ) {}

  @post('/posts')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Post, {exclude: ['id']}),
        },
      },
    })
    post: Omit<Post, 'id'>,
  ): Promise<Post> {
    return this.postRepository.create(post);
  }

  @get('/posts')
  async find(): Promise<Post[]> {
    return this.postRepository.find();
  }

  @get('/posts/{id}')
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Post> {
    return this.postRepository.findById(id);
  }

  @put('/posts/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() post: Post,
  ): Promise<void> {
    await this.postRepository.updateById(id, post);
  }

  @del('/posts/{id}')
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.postRepository.deleteById(id);
  }

  @patch('/posts/{id}')
  async patchById(
    @param.path.string('id') id: string,
    @requestBody() post: Partial<Post>,
  ): Promise<void> {
    await this.postRepository.updateById(id, post);
  }

  @post('/posts/import-posts')
  async importPosts(): Promise<{imported: number; errors: any[]}> {
    const filePath = path.resolve('C:/Users/vasem/Downloads/fake_posts.json');
    let posts: any[] = [];
    let errors: any[] = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      posts = JSON.parse(data);
    } catch (err) {
      throw new Error('Failed to read fake_posts.json: ' + err);
    }
    let imported = 0;
    for (const post of posts) {
      try {
        await this.postRepository.create(post);
        imported++;
      } catch (e) {
        errors.push({post, error: e.message});
      }
    }
    return {imported, errors};
  }

  @get('/posts/post-ids')
  async getAllPostIds(): Promise<string> {
    const posts = await this.postRepository.find({fields: {id: true}});
    const ids = posts.map(p => p.id).filter(Boolean);
    return ids.join(',');
  }
}
