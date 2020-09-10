import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTransactions1599744298672 implements MigrationInterface {

    // {
    //     "id": "uuid",
    //     "title": "Salário",
    //     "value": 4000,
    //     "type": "income",
    //     "category": {
    //       "id": "uuid",
    //       "title": "Salary",
    //       "created_at": "2020-04-20T00:00:49.620Z",
    //       "updated_at": "2020-04-20T00:00:49.620Z"
    //     },
    //     "created_at": "2020-04-20T00:00:49.620Z",
    //     "updated_at": "2020-04-20T00:00:49.620Z"
    //   },


    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table ({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable('transactions');
    }

}
