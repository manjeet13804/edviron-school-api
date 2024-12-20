import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findBySchool(schoolId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ school_id: schoolId }).exec();
  }

  async findByCustomOrderId(customOrderId: string): Promise<Transaction> {
    return this.transactionModel.findOne({ custom_order_id: customOrderId }).exec();
  }

  async updateStatus(customOrderId: string, status: string): Promise<Transaction> {
    return this.transactionModel.findOneAndUpdate(
      { custom_order_id: customOrderId },
      { status: status },
      { new: true },
    ).exec();
  }

  async webhookUpdate(payload: any): Promise<Transaction> {
    const { order_info: { order_id, status } } = payload;
    return this.updateStatus(order_id, status);
  }
}
