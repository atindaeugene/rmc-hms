import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BranchesModule } from './modules/branches/branches.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../../.env'] }),
    PrismaModule,
    BranchesModule,
    AuthModule,
  ],
})
export class AppModule {}
