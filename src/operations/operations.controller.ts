import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { OperationResponseDto } from './dto/response/operation-response-dto';
import { ChangeOperationRequestDto } from './dto/request/change-operation-request-dto';
import { CreateOperationRequestDto } from './dto/request/create-operation-request-dto';

@ApiTags('Operations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @ApiOperation({ summary: 'Create new operation' })
  @ApiResponse({ status: 201, type: OperationResponseDto })
  @ApiParam({
    name: 'bill_id',
    type: 'number',
    description: 'bill id',
    example: '1',
    required: true,
  })
  @ApiParam({
    name: 'category_id',
    type: 'number',
    description: 'category id',
    example: '1',
    required: true,
  })
  @Post(':bill_id:category_id')
  create(
    @Body() billRequestDto: CreateOperationRequestDto,
    @Param() params: any,
  ) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Get operation by id' })
  @ApiResponse({ status: 200, type: OperationResponseDto })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'operation id',
    example: '1',
    required: true,
  })
  @Get(':id')
  getOperation(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Change operation' })
  @ApiResponse({ status: 201, type: OperationResponseDto })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'operation id',
    example: '1',
    required: true,
  })
  @Patch(':id')
  changeOperation(
    @Body() changeOperationRequestDto: ChangeOperationRequestDto,
    @Param() params: any,
  ) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Delete operation by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'operation id',
    example: '1',
    required: true,
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteOperation(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Get all operations' })
  @ApiQuery({ name: 'bill_id', required: false })
  @ApiQuery({ name: 'category_id', required: false })
  @ApiResponse({ status: 200, type: [OperationResponseDto] })
  @Get('')
  getAllOperations(
    @Query('bill_id') billId: number,
    @Query('category_id') categoryId: number,
  ) {
    console.log(billId, categoryId);
  }
}
