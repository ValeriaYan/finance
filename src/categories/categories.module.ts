import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoriesController],
  imports: [forwardRef(() => AuthModule)],
  providers: [CategoriesService],
})
export class CategoriesModule {}
