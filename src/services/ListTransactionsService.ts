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

interface Response {
  transactions: Array<Transaction>,
  balance: Balance,
}

class ListTransactionsService {
  public async execute(): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    
    const transactions = await transactionsRepository.find({relations: ['category']});

    const balance = await transactionsRepository.getBalance();

    const response = { transactions, balance } as Response;
 
    return response;
  }
}

export default ListTransactionsService;
