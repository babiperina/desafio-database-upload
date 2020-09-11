import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';
import { getCustomRepository, TransactionRepository } from 'typeorm';
import DeleteTransactionService from '../services/DeleteTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

/* 

Responsabilidades da rota:


*/

transactionsRouter.get('/', async (request, response) => {
  try {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
  
    const transactions = await transactionsRepository.find({relations: ['category']});
    const balance = await transactionsRepository.getBalance();
  
    return response.json({transactions, balance});
  } catch (err) {
    return response.status(400).json({message: err.message})
  }
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const {title, value, type, category} = request.body;

    const createCategory =  new CreateCategoryService();

    const createTransaction =  new CreateTransactionService();

    const categoryCreated = await createCategory.execute({
      title: category,
    });
    
    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category_id: categoryCreated.id,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({status: 'error', message: err.message});
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
