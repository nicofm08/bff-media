import { Module } from '@nestjs/common';
import { ApiConfigServerController } from './controllers/api-config-server.controller';
import { ApiConfigServerService } from './services/api-config-server.service';
import { ConfigModule } from '../../config/config.module';
import { ApiAuthModule } from '../api-auth/api-auth.module';

@Module({
  imports: [ConfigModule, ApiAuthModule],
  controllers: [ApiConfigServerController],
  providers: [ApiConfigServerService],
  exports: [ApiConfigServerService],
})
export class ApiConfigServerModule {}
