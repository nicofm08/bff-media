import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiConfigServerService } from '../services/api-config-server.service';
import { Request } from 'express';
import { AppLogger } from '../../../common/logger/logger.service';
import { AuthGuard } from 'src/common/guards/auth.guard';


@Controller('config-server')
export class ApiConfigServerController {
  #logger = new AppLogger();

  constructor(private readonly configServerService: ApiConfigServerService) {
    this.#logger.setContext(ApiConfigServerController.name, '[CONTROLLER]');
  }

  @Post('/startup')
  @UseGuards(AuthGuard)
  async getConfig(@Req() req: Request) {
    this.#logger.log(`Config Request: ${JSON.stringify(req.body)}`);
    return this.configServerService.getConfig(req);
  }
}