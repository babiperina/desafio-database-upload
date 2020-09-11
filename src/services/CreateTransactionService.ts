// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository} from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

/* 

Responsabilidade do Service:

Conectar a API com o banco de dados.
Regra de negócio de criação de dados.

*/

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string,
  value: number,
  type: 'income'|'outcome',
  category_id: string,
}

class CreateTransactionService {
  public async execute({title, value, type, category_id}: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    
    if (type === 'outcome'){
      const { total } = await transactionsRepository.getBalance() as Balance;
      
      const nTotal = total - value;
      
      if(nTotal < 0){
        throw Error('Outcome invalid');
      }
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
