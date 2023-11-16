import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from './models/users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ObjectionModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
