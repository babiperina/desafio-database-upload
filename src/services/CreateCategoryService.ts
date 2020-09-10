// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string,
}

class CreateCategoryService {
  public async execute({title}: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categories = categoryRepository.find({
      where: {
        title,
      }
    });

    if((await categories).length>0){
      throw Error('Already exists an category with this title');
    }
           
    const category = categoryRepository.create({
        title
    });
    await categoryRepository.save(category);

    console.log(category);

    return category;
  }
}

export default CreateCategoryService;
