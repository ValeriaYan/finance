import { Module } from '@nestjs/common';
import { ObjectionModule, Model } from 'nestjs-objection';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { CategoriesModule } from './categories/categories.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ObjectionModule.forRoot({
      Model,
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          host: process.env.POSTGRES_HOST,
          port: +process.env.POSTGRES_PORT,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        },
      },
    }),
    UsersModule,
    AuthModule,
    BillsModule,
    CategoriesModule,
    OperationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
