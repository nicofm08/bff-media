import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../../../config/config.service';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class AuthService {
  #logger = new AppLogger();

  constructor(private readonly configService: ConfigService) {
    this.#logger.setContext(AuthService.name, '[SERVICE]');
  }

  async validateToken(token: string): Promise<any> {
    try {
      const apiAuthUrl = this.configService.get('API_AUTH_URL') + '/verify';
      this.#logger.log(`Validating token ${token} in ${apiAuthUrl}`);
      const response = await axios.post(
        `${apiAuthUrl}`, 
        { token: token },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
        
      this.#logger.log(`Token Verified: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      this.#logger.error(`Error validating token: ${error}`);
      throw error;
    }
  }

  async login(@Body() req: any) {
    try {
      const apiAuthUrl = this.configService.get('API_AUTH_URL') + '/login-generic';
      this.#logger.log(`Redirectiing to ${apiAuthUrl}`);
      const response = await axios.post(
        `${apiAuthUrl}`,
        req.body,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
      this.#logger.log(`Login ok, response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error)  {
      this.#logger.error(`Error init session: ${error}`);
      if (error.response.status === 401) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
      
    }
  }

  async getUserEntity(entityHash: string, role: string): Promise<any> {
    try {
      const apiAuthUrl = this.configService.get('API_AUTH_URL') + '/user-entity';
      this.#logger.log(`Redirectiing to ${apiAuthUrl}`);
      const response = await axios.post(
        `${apiAuthUrl}`,
        { entity_hash: entityHash, role: role },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
      this.#logger.log(`User Entity: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      this.#logger.error(`Error getting user entity: ${error}`);
      throw error;
    }
  }
}
