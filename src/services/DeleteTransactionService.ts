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
        
        // const transaction = await transactionsRepository.findOne({
        //   where:{
        //     id
        //   }
        // })

        
        const transaction = await transactionsRepository.delete({id});
        console.log(transaction.raw);
        
      } catch (error) {
        throw Error('Invalid id transaction');
      }
  }
}

export default DeleteTransactionService;
