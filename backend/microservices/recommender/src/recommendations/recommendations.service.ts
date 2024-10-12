import { Injectable } from '@nestjs/common';
import { Recommendation } from './models/recommendation.model';

@Injectable()
export class RecommendationsService {
  private users: Recommendation[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Richard Roe' },
  ];

  findById(id: number): Recommendation {
    return this.users.find((user) => user.id === Number(id));
  }
}
