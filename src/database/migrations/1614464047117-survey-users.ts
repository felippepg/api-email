import { type } from "os";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class surveyUsers1614464047117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'survey_users',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated:true,
                        generationStrategy: 'increment',
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: 'user_id',
                        type: 'integer'
                    },
                    {
                        name: 'survey_id',
                        type: 'integer'
                    },
                    {
                        name: 'value',
                        type: 'integer',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk-users-id',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'

                    },
                    {
                        name: 'fk-survey-id',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames:['survey_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    }
                ] 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('survey-users');
    }

}
