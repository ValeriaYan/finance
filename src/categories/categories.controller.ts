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
import { CategoriesService } from './categories.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CategoryResponseDto } from './dto/response/category-response-dto';
import { ChangeCategoryRequestDto } from './dto/request/change-category-request-dto';
import { CreateCategoryRequestDto } from './dto/request/create-category-request-dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create new category for user' })
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  @ApiParam({
    name: 'user_id',
    type: 'number',
    description: 'user id',
    example: '1',
    required: true,
  })
  @Post(':user_id')
  create(@Body() categoryRequestDto: CreateCategoryRequestDto) {
    console.log(categoryRequestDto);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'category id',
    example: '1',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: CategoryResponseDto,
    description: 'Successful operation',
  })
  @Get(':id')
  getUser(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Change name or description of category' })
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'category id',
    example: '1',
    required: true,
  })
  @Patch(':id')
  changeBill(
    @Body() changeCategoryRequestDto: ChangeCategoryRequestDto,
    @Param() params: any,
  ) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Delete category by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'category id',
    example: '1',
    required: true,
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteBill(@Param() params: any) {
    console.log(params);
  }

  @ApiOperation({ summary: 'Get all category by user id' })
  @ApiResponse({
    status: 200,
    type: [CategoryResponseDto],
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
  getAllCategories(@Param() params: any) {
    console.log(params);
  }
}
