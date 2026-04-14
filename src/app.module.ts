import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigModule } from './api-config/api-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ApireviewModule } from './modules/apireview/apireview.module';

@Module({
  imports: [ApiConfigModule, AuthModule, UserModule, ApireviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
