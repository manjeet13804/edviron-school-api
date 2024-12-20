import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/edviron-school'),
    TransactionsModule,
  ],
})
export class AppModule {}
