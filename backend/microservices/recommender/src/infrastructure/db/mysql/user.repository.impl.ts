import { Inject } from '@nestjs/common';
import { User } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { IConfigService } from '../../../domain/services/config.service.interface';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async findById(id: string): Promise<User | null> {
    const query = `
      query {
        getUser(id: "${id}") {
          carrera
          distrito
          edad
          id
          interests {
            interest
          }
          sexo
        }
      }
    `;

    try {
      const response = await fetch(this.configService.userServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      const result = data['data']['getUser'];

      if (!result) {
        return Promise.resolve(null);
      }

      const user = new User(
        result['id'],
        result['carrera'],
        result['edad'],
        result['sexo'],
        result['distrito'],
        result['interests'].map((item: { interest: string }) => item.interest),
      );
      return Promise.resolve(user);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
