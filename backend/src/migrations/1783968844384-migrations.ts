import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1783968844384 implements MigrationInterface {
  name = "Migrations1783968844384";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "village_gallery_images" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "storage_key" text NOT NULL, "mime_type" text, "size_bytes" integer NOT NULL DEFAULT '0', "sort_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "villageId" integer NOT NULL, CONSTRAINT "PK_9a09abaf1a154f3fcf455c7dc4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_VILLAGE_GALLERY_VILLAGE" ON "village_gallery_images" ("title") `,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh-tokens" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_updates_status_after_update_enum" AS ENUM('planned', 'in_progress', 'on_hold', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_updates" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "update_date" date NOT NULL, "progress_percentage" integer NOT NULL DEFAULT '0', "status_after_update" "public"."project_updates_status_after_update_enum" NOT NULL DEFAULT 'planned', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer NOT NULL, CONSTRAINT "PK_2093d4d18851bc0f6ec8b1197e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PROJECT_UPDATE_PROJECT" ON "project_updates" ("title") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_images" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "storage_key" text NOT NULL, "mime_type" text, "size_bytes" integer NOT NULL DEFAULT '0', "sort_order" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer NOT NULL, CONSTRAINT "PK_7683abb57ed0c0fa8379f54692b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PROJECT_IMAGE_PROJECT" ON "project_images" ("title") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."facilities_type_enum" AS ENUM('school', 'hospital', 'primary_health_centre', 'park', 'library', 'water_tank', 'police_station', 'bus_stop', 'bank', 'panchayat_office', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "facilities" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "type" "public"."facilities_type_enum" NOT NULL DEFAULT 'other', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "villageId" integer NOT NULL, CONSTRAINT "PK_2e6c685b2e1195e6d6394a22bc7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_FACILITY_VILLAGE_TYPE" ON "facilities" ("name") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."development_projects_category_enum" AS ENUM('road', 'bridge', 'hospital', 'school', 'drainage', 'water_supply', 'electricity', 'smart_village', 'solar', 'community_hall', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."development_projects_status_enum" AS ENUM('planned', 'in_progress', 'on_hold', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "development_projects" ("id" SERIAL NOT NULL, "name" text NOT NULL, "category" "public"."development_projects_category_enum" NOT NULL DEFAULT 'other', "description" text, "status" "public"."development_projects_status_enum" NOT NULL DEFAULT 'planned', "approval_date" date, "start_date" date, "expected_completion_date" date, "actual_completion_date" date, "allocated_budget" numeric(12,2) NOT NULL DEFAULT '0', "spent_budget" numeric(12,2) NOT NULL DEFAULT '0', "progress_percentage" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "villageId" integer NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "PK_3639500548390f2e6bf1869b3d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PROJECT_VILLAGE" ON "development_projects" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_documents" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "storage_key" text NOT NULL, "mime_type" text, "size_bytes" integer NOT NULL DEFAULT '0', "document_type" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer NOT NULL, CONSTRAINT "PK_c0d7fa982569e84a809aa2ff5d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_PROJECT_DOCUMENT_PROJECT" ON "project_documents" ("title") `,
    );
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_DEPARTMENT_NAME" ON "departments" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" text NOT NULL, "lastname" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL DEFAULT 'user', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "villages" ("id" SERIAL NOT NULL, "name" text NOT NULL, "district" text NOT NULL, "taluka" text NOT NULL, "state" text NOT NULL, "pincode" character varying(10), "latitude" numeric(10,8), "longitude" numeric(11,8), "population" integer, "area_sq_km" numeric(10,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by_user_id" integer, CONSTRAINT "PK_3d9cf7c71c05c7ef684331317bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_VILLAGE_UNIQUE" ON "villages" ("name", "district", "taluka", "state") `,
    );
    await queryRunner.query(
      `ALTER TABLE "village_gallery_images" ADD CONSTRAINT "FK_d7e48e1e0e34f4796e828903cf4" FOREIGN KEY ("villageId") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_updates" ADD CONSTRAINT "FK_9eb8470a1333d4a546db555a012" FOREIGN KEY ("projectId") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_images" ADD CONSTRAINT "FK_a6efe5710e20ed5469e7719f074" FOREIGN KEY ("projectId") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" ADD CONSTRAINT "FK_2729cbf81a8e2dfe6e9ad9bddb5" FOREIGN KEY ("villageId") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "development_projects" ADD CONSTRAINT "FK_f5395ce7c52b16e6f196f74477e" FOREIGN KEY ("villageId") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "development_projects" ADD CONSTRAINT "FK_ec9a80ba708b19a8a5ff775f629" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" ADD CONSTRAINT "FK_f45c0dc27313262f03ef705df1d" FOREIGN KEY ("projectId") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "villages" ADD CONSTRAINT "FK_31072b37c29e59e2290a715f9ed" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "villages" DROP CONSTRAINT "FK_31072b37c29e59e2290a715f9ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_documents" DROP CONSTRAINT "FK_f45c0dc27313262f03ef705df1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "development_projects" DROP CONSTRAINT "FK_ec9a80ba708b19a8a5ff775f629"`,
    );
    await queryRunner.query(
      `ALTER TABLE "development_projects" DROP CONSTRAINT "FK_f5395ce7c52b16e6f196f74477e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" DROP CONSTRAINT "FK_2729cbf81a8e2dfe6e9ad9bddb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_images" DROP CONSTRAINT "FK_a6efe5710e20ed5469e7719f074"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_updates" DROP CONSTRAINT "FK_9eb8470a1333d4a546db555a012"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "village_gallery_images" DROP CONSTRAINT "FK_d7e48e1e0e34f4796e828903cf4"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_VILLAGE_UNIQUE"`);
    await queryRunner.query(`DROP TABLE "villages"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_DEPARTMENT_NAME"`);
    await queryRunner.query(`DROP TABLE "departments"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_PROJECT_DOCUMENT_PROJECT"`,
    );
    await queryRunner.query(`DROP TABLE "project_documents"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PROJECT_VILLAGE"`);
    await queryRunner.query(`DROP TABLE "development_projects"`);
    await queryRunner.query(
      `DROP TYPE "public"."development_projects_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."development_projects_category_enum"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_FACILITY_VILLAGE_TYPE"`);
    await queryRunner.query(`DROP TABLE "facilities"`);
    await queryRunner.query(`DROP TYPE "public"."facilities_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PROJECT_IMAGE_PROJECT"`);
    await queryRunner.query(`DROP TABLE "project_images"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_PROJECT_UPDATE_PROJECT"`);
    await queryRunner.query(`DROP TABLE "project_updates"`);
    await queryRunner.query(
      `DROP TYPE "public"."project_updates_status_after_update_enum"`,
    );
    await queryRunner.query(`DROP TABLE "refresh-tokens"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_VILLAGE_GALLERY_VILLAGE"`,
    );
    await queryRunner.query(`DROP TABLE "village_gallery_images"`);
  }
}
