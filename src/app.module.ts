import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { ApiConfigServerModule } from './modules/api-config-server/api-config-server.module';
import { ApiAuthModule } from './modules/api-auth/api-auth.module';
import { ApiMediaModule } from './modules/api-media/api-media.module';

@Module({
  imports: [  
    LoggerModule,
    ConfigModule,
    ApiConfigServerModule,
    ApiAuthModule,
    ApiMediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
