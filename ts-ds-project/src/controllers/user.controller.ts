import {repository} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, requestBody, put, del} from '@loopback/rest';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
import * as fs from 'fs';
import * as path from 'path';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/users')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {exclude: ['id']}),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/users')
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  @get('/users/{id}')
  async findById(
    @param.path.string('id') id: string,
  ): Promise<User> {
    return this.userRepository.findById(id);
  }

  @put('/users/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @del('/users/{id}')
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/users/import-users')
  async importUsers(): Promise<{imported: number; errors: any[]}> {
    const filePath = path.resolve(__dirname, "C:/Users/vasem/Downloads/users.json");
    let users: any[] = [];
    let errors: any[] = [];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(data);
    } catch (err) {
      throw new Error('Failed to read users.json: ' + err);
    }
    let imported = 0;
    for (const user of users) {
      try {
        await this.userRepository.create(user);
        imported++;
      } catch (e) {
        errors.push({user, error: e.message});
      }
    }
    return {imported, errors};
  }

  @get('/users/usernames')
  async getUsernames(): Promise<string> {
    const users = await this.userRepository.find({fields: {id: true}});
    const usernames = users.map(u => u.id).filter(Boolean);
    return usernames.join(',');
  }
}
