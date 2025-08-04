import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../../../config/config.service';
import { AppLogger } from 'src/common/logger/logger.service';

@Injectable()
export class ApiMediaService {
  #logger = new AppLogger();

  constructor(private readonly configService: ConfigService) {
    this.#logger.setContext(ApiMediaService.name, '[SERVICE]');
  }



  async preasignedUrl(@Body() req: any) {
    try {
      const apiMediaUrl = this.configService.get('API_MEDIA_URL') + '/media/get_preasigned_url';
      this.#logger.log(`Redirectiing to ${apiMediaUrl}`);
      const response = await axios.post(
        `${apiMediaUrl}`,
        req.body,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
      this.#logger.log(`Preasigned url ok, response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error)  {
      this.#logger.error(`Error getting preasigned url: ${error}`);
      throw error;
      
    }
  }

  async updateGeneric(@Body() req: any) {
    try {
      const apiMediaUrl = this.configService.get('API_MEDIA_URL') + '/media/update_generic';
      this.#logger.log(`Redirectiing to ${apiMediaUrl}`);
      const response = await axios.post(
        `${apiMediaUrl}`,
        req.body,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
      this.#logger.log(`Update generic ok, response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error)  {
      this.#logger.error(`Error updating generic: ${error}`);
      throw error;
      
    }
  }

  async triggerPublish(@Body() req: any) {
    try {
      const apiMediaUrl = this.configService.get('API_MEDIA_URL') + '/media/trigger_publish';
      this.#logger.log(`Redirectiing to ${apiMediaUrl}`);
      const response = await axios.post(
        `${apiMediaUrl}`,
        req.body,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.configService.get('HTTP_TIMEOUT'),
        }
      );
      this.#logger.log(`Trigger publish ok, response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error)  {
      this.#logger.error(`Error triggering publish: ${error}`);
      throw error;
      
    }
  }
}