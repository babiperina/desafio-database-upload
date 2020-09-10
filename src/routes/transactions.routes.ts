import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';
import { getCustomRepository, TransactionRepository } from 'typeorm';
import ListTransactionsService from '../services/ListTransactionsService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

/* 

Responsabilidades da rota:


*/

transactionsRouter.get('/', async (request, response) => {
  try {
    const listTransactions =  new ListTransactionsService();
 
    const body = await listTransactions.execute();
    
    return response.json(body);
  } catch (err) {
    return response.status(400).json({message: err.message})
  }
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const {title, value, type, category} = request.body;

    const createCategory =  new CreateCategoryService();
    
    const categoryCreated = await createCategory.execute({
      title: category,
    });

    const createTransaction =  new CreateTransactionService();

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category_id: categoryCreated.id,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({error: err.message});
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
