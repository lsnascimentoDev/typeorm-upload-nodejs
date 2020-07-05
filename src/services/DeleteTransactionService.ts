import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const transactionExists = await transactionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!transactionExists) {
      throw new AppError('Transaction does not exists');
    }

    await transactionRepository.remove(transactionExists);
  }
}

export default DeleteTransactionService;
