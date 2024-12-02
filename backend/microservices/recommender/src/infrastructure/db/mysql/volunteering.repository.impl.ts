// TODO: IMPLEMENTAR CON GRAPHQL

import { Volunteering } from '../../../domain/models/volunteering.model';
import { IVolunteeringRepository } from '../../../domain/repositories/voluteering.repository.interface';

export class VolunteeringRepository implements IVolunteeringRepository {
  private volunteerings: Volunteering[] = [
    new Volunteering(
      "1",
      'Enseñanza de niños de primaria',
      'Educación',
      'Ayudar a los niños de primaria',
      'La Victoria',
      ['Presencial'],
    ),
    new Volunteering(
      "2",
      'Enseñanza de niños de secundaria',
      'Educación',
      'Ayudar a los niños de secundaria',
      'San Miguel',
      ['Virtual'],
    ),
  ];

  constructor() {}

  findById(id: string): Promise<Volunteering | null> {
    const volunteering = this.volunteerings.find((s) => s.id === id);
    return Promise.resolve(volunteering);
  }
}
