import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1783969066882 implements MigrationInterface {
  name = "Migrations1783969066882";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "lastname" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "firstname" text NOT NULL`,
    );
  }
}
