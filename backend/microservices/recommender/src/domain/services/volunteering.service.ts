import { Inject, Injectable } from '@nestjs/common';
import { IVolunteeringRepository } from '../repositories/voluteering.repository.interface';
import { Volunteering } from '../models/volunteering.model';

@Injectable()
export class VolunteeringService {
  constructor(
    @Inject('IVolunteeringRepository')
    private readonly repo: IVolunteeringRepository,
  ) {}
  async getVolunteeringById(id: string): Promise<Volunteering | null> {
    return this.repo.findById(id);
  }
}
