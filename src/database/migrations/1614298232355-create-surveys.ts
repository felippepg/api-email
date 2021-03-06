import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurveys1614298232355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:'surveys',
            columns:[
                {
                    name:'id',
                    type:'integer',
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true
                },
                {
                    name:'title',
                    type:'varchar'
                },
                {
                    name:'description',
                    type:'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default:'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('surveys');
    }

}
