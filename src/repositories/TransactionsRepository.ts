import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

/*
Responsabilidade do repositório:

Conectar com o db, regras de negócio.
*/

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> { //Balance returned
    const transactions = await this.find();
    
    const income = transactions.reduce((total, transaction) => {
      if(transaction.type == 'income') return total += transaction.value;
      else return total;
    },0);

    const outcome = transactions.reduce((total, transaction) => {
      if(transaction.type == 'outcome') return total += transaction.value;
      else return total;
    },0);

    const total = income - outcome;

    if(total < 0) {
      throw Error('An invalid value to balance');
    }
    
    const balance = {income, outcome, total} as Balance;

    return balance;
  }
}

export default TransactionsRepository;
