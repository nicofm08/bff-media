import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {ApiMediaService} from '../services/api-media.service';
import { Request } from 'express';
import { AppLogger } from '../../../common/logger/logger.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api-media')
export class ApiMediaController {
    #logger = new AppLogger();

    
    constructor(private readonly apiMediaService: ApiMediaService) {
        this.#logger.setContext(ApiMediaController.name, '[CONTROLLER]');
    }
    
        
        @Post('/preasigned-url')
        @UseGuards(AuthGuard)
        async preasignedUrl(@Req() req: Request) {
            this.#logger.log(`Preasigned url request: ${JSON.stringify(req.body)}`);
            return await this.apiMediaService.preasignedUrl(req);
        }

        @Post('/update-generic')
        @UseGuards(AuthGuard)
        async updateGeneric(@Req() req: Request) {
            this.#logger.log(`Update generic request: ${JSON.stringify(req.body)}`);
            return await this.apiMediaService.updateGeneric(req);
        }

        @Post('/trigger-publish')
        @UseGuards(AuthGuard)
        async triggerPublish(@Req() req: Request) {
            this.#logger.log(`Trigger publish request: ${JSON.stringify(req.body)}`);
            return await this.apiMediaService.triggerPublish(req);
        }
        
        
    }