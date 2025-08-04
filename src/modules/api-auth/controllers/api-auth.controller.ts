import { Controller, Post, Req } from '@nestjs/common';
import {AuthService} from '../services/api-auth.service';
import { Request } from 'express';
import { AppLogger } from '../../../common/logger/logger.service';

@Controller('api-auth')
export class ApiAuthController {
    #logger = new AppLogger();

    
    constructor(private readonly authService: AuthService) {
        this.#logger.setContext(ApiAuthController.name, '[CONTROLLER]');
    }
    
    @Post('/login')
    async login(@Req() req: Request) {
        this.#logger.log(`Login request: ${JSON.stringify(req.body)}`);
        return await this.authService.login(req);
    }
    }