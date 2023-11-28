import { Controller } from '@nestjs/common';
import { UsersBillsService } from './users-bills.service';

@Controller('users-bills')
export class UsersBillsController {
  constructor(private readonly usersBillsService: UsersBillsService) {}
}
