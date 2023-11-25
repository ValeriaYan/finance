import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { BillsService } from './bills.service';
import { BillResponseDto } from './dto/response/bill-response-dto';
import { CreateBillRequestDto } from './dto/request/create-bill-request-dto';
import { ChangeBillRequestDto } from './dto/request/change-bill-request-dto';

@ApiTags('Bills')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @ApiOperation({ summary: 'Create new bill for user' })
  @ApiResponse({ status: 201, type: BillResponseDto })
  @ApiParam({
    name: 'user_id',
    type: 'number',
    description: 'user id',
    example: '1',
    required: true,
  })
  @Post(':user_id')
  create(@Body() billRequestDto: CreateBillRequestDto) {
    console.log(billRequestDto);
  }

  @ApiOperation({ summary: 'Get bill by id' })
  @ApiResponse({ status: 200, type: BillResponseDto })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'bill id',
    example: '1',
    required: true,
  })
  @Get(':id')
  getBill(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Change name, description or amount of bill' })
  @ApiResponse({ status: 201, type: BillResponseDto })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'bill id',
    example: '1',
    required: true,
  })
  @Patch(':id')
  changeBill(
    @Body() changeBillRequestDto: ChangeBillRequestDto,
    @Param() params: any,
  ) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Delete bill by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'bill id',
    example: '1',
    required: true,
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteBill(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Get all bills by user id' })
  @ApiResponse({
    status: 200,
    type: [BillResponseDto],
    description: 'Successful operation',
  })
  @ApiParam({
    name: 'user_id',
    type: 'number',
    description: 'user id',
    example: '1',
    required: true,
  })
  @Get(':user_id')
  getAllBills(@Param() params: any) {
    console.log(params);
  }
}
