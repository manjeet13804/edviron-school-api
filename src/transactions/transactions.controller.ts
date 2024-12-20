import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Get('school/:schoolId')
  async findBySchool(@Param('schoolId') schoolId: string) {
    return this.transactionsService.findBySchool(schoolId);
  }

  @Get('status/:customOrderId')
  async findByCustomOrderId(@Param('customOrderId') customOrderId: string) {
    return this.transactionsService.findByCustomOrderId(customOrderId);
  }

  @Post('webhook')
  async webhookUpdate(@Body() payload: any) {
    return this.transactionsService.webhookUpdate(payload);
  }

  @Put('status/:customOrderId')
  async updateStatus(@Param('customOrderId') customOrderId: string, @Body('status') status: string) {
    return this.transactionsService.updateStatus(customOrderId, status);
  }
}
