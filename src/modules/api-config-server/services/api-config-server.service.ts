import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import axios from 'axios';
import { Request } from 'express';
import { AppLogger } from '../../../common/logger/logger.service';

@Injectable()
export class ApiConfigServerService {
  #logger = new AppLogger();

  constructor(private readonly configService: ConfigService) {
    this.#logger.setContext(ApiConfigServerService.name, '[SERVICE]');
  }

  async getConfig(req: Request): Promise<any> {
    try {
      const ConfigServerUrl = this.configService.get('CONFIG_SERVER_URL') + '/startup';
      this.#logger.log(`Redirectiing to ${ConfigServerUrl}`);
      const body = {
        repository: req.body.repository,
        branch: req.body.branch,
        component: req.body.component,
        tks: this.configService.get('CONFIG_SERVER_TOKEN'),
      };
      this.#logger.log(`Config Request: ${JSON.stringify(body)}`);
      const response = await axios({
        method: req.method,
        url: ConfigServerUrl,
        headers: {'Content-Type': 'application/json' },
        data: body,
        timeout: this.configService.get('HTTP_TIMEOUT'),
      });

      this.#logger.log(`Config response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      this.#logger.error(`Error processing Config: ${error}`);
      throw error;
    }
  }
}