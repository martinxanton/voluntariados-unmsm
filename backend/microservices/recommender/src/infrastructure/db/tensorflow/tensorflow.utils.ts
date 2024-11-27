import { Inject } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import { IConfigService } from '../../../domain/services/config.service.interface';

export class GoogleCloudUtils {
  constructor(
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async getAccessToken(): Promise<string> {
    try {
      const auth = new GoogleAuth({
        keyFile: this.configService.gcpKeyPath,
        scopes: this.configService.gcpScopes,
      });

      const client = await auth.getClient();

      const tokenResponse = await client.getAccessToken();
      const accessToken = tokenResponse.token;

      return accessToken;
    } catch (error) {
      throw new Error('Error al obtener el token de acceso: ' + error.message);
    }
  }
}
