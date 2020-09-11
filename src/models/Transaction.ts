/* 

É preciso deixar claro que o model está relacionado
a uma tabela do db.

*/
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import Category from './Category';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('float')
  value: number;

  @Column( { select:false } )
  category_id: string; 

  @ManyToOne(() => Category)
  @JoinColumn( { name: 'category_id' } )
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Transaction;
