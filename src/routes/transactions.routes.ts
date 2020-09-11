import { Router } from 'express';
import multer from 'multer';

import { getCustomRepository, TransactionRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';
import CreateCategoryService from '../services/CreateCategoryService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

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
  try {
    const { id } = request.params;

    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute({
      id
    });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).send({status: 'error', message: err.message});
  }
});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  //Importar arquivo csv -- Multer utilizado como mid.
  const importTransactions = new ImportTransactionsService();

  const transactions = await importTransactions.execute(request.file.path);
  //Criar transações
  //Retornar transações criadas
  return response.json(transactions);
});

export default transactionsRouter;
