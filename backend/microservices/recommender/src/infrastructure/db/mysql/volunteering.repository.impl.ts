import { Inject } from '@nestjs/common';
import { Volunteering } from '../../../domain/models/volunteering.model';
import { IVolunteeringRepository } from '../../../domain/repositories/voluteering.repository.interface';
import { IConfigService } from '../../../domain/services/config.service.interface';

export class VolunteeringRepository implements IVolunteeringRepository {
  constructor(
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async findById(id: string): Promise<Volunteering | null> {
    const query = `
      query {
        getVolunteerById(id: "${id}") {
          id
          title
          category
          location
          tags
        }
      }
    `;

    try {
      const response = await fetch(this.configService.volunteeringServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      const result = data['data']['getVolunteerById'];
      
      if (!result) {
        return Promise.resolve(null);
      }

      // TODO: FIX THIS objective

      const volunteering = new Volunteering(
        result['id'],
        result['title'],
        result['category'],
        result['objective'] || 'objective',
        result['location'],
        result['tags'],
      );
      return Promise.resolve(volunteering);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
