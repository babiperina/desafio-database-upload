// import AppError from '../errors/AppError';

import { getCustomRepository } from "typeorm";
import TransactionsRepository from "../repositories/TransactionsRepository";
import { response } from "express";

interface Request {
  id: string,
}

class DeleteTransactionService {
  public async execute({id}: Request): Promise<void> {
      const transactionsRepository = getCustomRepository(TransactionsRepository);
      try {        
        await transactionsRepository.delete({id});
      } catch (error) {
        throw Error('This transaction not exists');
      }
  }
}

export default DeleteTransactionService;
