import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1614182196210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isGenerated: true,
                        generationStrategy: "increment",
                        isPrimary: true
                    },
                    { 
                        name: "name", 
                        type: "varchar"
                    },
                    { 
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('users')
    }

}
