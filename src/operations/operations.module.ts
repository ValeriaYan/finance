import { Module, forwardRef } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OperationsController],
  imports: [forwardRef(() => AuthModule)],
  providers: [OperationsService],
})
export class OperationsModule {}
