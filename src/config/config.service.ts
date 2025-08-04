import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);
  private config: Record<string, any> = {};

  async onModuleInit() {
    await this.loadConfig();
  }

  private async loadConfig() {
    this.logger.log('Getting configuration from config server');

    const url = process.env.CONFIG_SERVER_URL;
    this.logger.log(`URL: ${url}`);

    const data = {
      repository: process.env.REPOSITORY,
      branch: process.env.BRANCH,
      component: process.env.COMPONENT,
      tks: process.env.TKS,
    };

    this.logger.log(`Data: ${JSON.stringify(data)}`);

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      this.config = response.data;
      this.logger.log(
        'Configuration loaded successfully.',
        JSON.stringify(this.config),
      );
    } catch (error) {
      this.logger.error(`Failed to load configuration: ${error.message}`);
      process.exit(1);
    }
  }

  get(key: string): any {
    return this.config[key] || process.env[key] || null;
  }

  getAll(): Record<string, any> {
    return {
      CONFIG_SERVER_URL: this.get('CONFIG_SERVER_URL'),
      CONFIG_SERVER_TOKEN: this.get('CONFIG_SERVER_TOKEN'),
      API_AUTH_URL: this.get('API_AUTH_URL'),
      API_DAT_STREAM_URL: this.get('API_DAT_STREAM_URL'),
      HTTP_TIMEOUT: this.get('HTTP_TIMEOUT'),
      LOG_INIT: '[ICL_INI]',
      LOG_FINOK: '[ICL_FINOK]',
      LOG_FINERROR: '[ICL_FINERROR]',
      LOG_DATA: '[DATA]',
      LOG_HANDLER: '[REQ_BODY]',
      LOG_SERVICE: '[SERVICE]',
      LOG_USECASE: '[USE_CASE]',
      LOG_REPOSITORY: '[REPOSITORY]',
      LOG_CORE: '[CORE]',
      LOG_MIDDLEWARE: '[MIDDLEWARE]',
    };
  }
}
