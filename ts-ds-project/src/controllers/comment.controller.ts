import {repository} from '@loopback/repository';
import {post, get, param, getModelSchemaRef, requestBody, put, del, patch} from '@loopback/rest';
import {Comment} from '../models/comment.model';
import {CommentRepository} from '../repositories/comment.repository';
import * as fs from 'fs';
import * as path from 'path';

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) {}

  @post('/comments/import-comments')
  async importComments(): Promise<{imported: number; errors: any[]}> {
    const filePath = path.resolve('C:/Users/vasem/Downloads/comments.json');
    let comments: any[] = [];
    let errors: any[] = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      comments = JSON.parse(data);
    } catch (err) {
      throw new Error('Failed to read comments.json: ' + err);
    }
    let imported = 0;
    for (const comment of comments) {
      try {
        await this.commentRepository.create(comment);
        imported++;
      } catch (e) {
        errors.push({comment, error: e.message});
      }
    }
    return {imported, errors};
  }

  @post('/comments')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {exclude: ['id']}),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.commentRepository.create(comment);
  }

  @get('/comments')
  async find(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  @get('/comments/{id}')
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Comment> {
    return this.commentRepository.findById(id);
  }

  @put('/comments/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() comment: Comment,
  ): Promise<void> {
    await this.commentRepository.updateById(id, comment);
  }

  @patch('/comments/{id}')
  async patchById(
    @param.path.string('id') id: string,
    @requestBody() comment: Partial<Comment>,
  ): Promise<void> {
    await this.commentRepository.updateById(id, comment);
  }

  @del('/comments/{id}')
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.commentRepository.deleteById(id);
  }
}
