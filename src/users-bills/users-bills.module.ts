import { Module } from '@nestjs/common';
import { UsersBillsService } from './users-bills.service';
import { UsersBillsController } from './users-bills.controller';

@Module({
  controllers: [UsersBillsController],
  providers: [UsersBillsService],
})
export class UsersBillsModule {}
