import { Module, forwardRef } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
  imports: [forwardRef(() => AuthModule)],
  exports: [BillsService],
})
export class BillsModule {}
