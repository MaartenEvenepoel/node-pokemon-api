import { MigrationInterface, QueryRunner } from "typeorm";

export class TeamAddTestColumn1681478927339 implements MigrationInterface {
    name = 'TeamAddTestColumn1681478927339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "test"`);
    }

}
