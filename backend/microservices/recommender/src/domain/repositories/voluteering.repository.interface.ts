import { Volunteering } from '../models/volunteering.model';

export interface IVolunteeringRepository {
  findById(id: string): Promise<Volunteering | null>;
}
