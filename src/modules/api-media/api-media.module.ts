import { Module } from '@nestjs/common';
import { ApiMediaController } from './controllers/api-media.controller';
import { ApiMediaService } from './services/api-media.service';
import { ConfigModule } from '../../config/config.module';
import { ApiAuthModule } from '../api-auth/api-auth.module';

@Module({
  imports: [ConfigModule, ApiAuthModule],
  controllers: [ApiMediaController],
  providers: [ApiMediaService],
  exports: [ApiMediaService],
})
export class ApiMediaModule {}
