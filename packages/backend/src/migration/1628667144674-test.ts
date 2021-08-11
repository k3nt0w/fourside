import { MigrationInterface, QueryRunner } from 'typeorm'

export class test1628667144674 implements MigrationInterface {
  name = 'test1628667144674'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `staffs` (`created_at` int NOT NULL, `updated_at` int NOT NULL, `deleted_at` int NULL, `id` varchar(255) NOT NULL, `display_name` varchar(36) NOT NULL, `icon_image_path` varchar(3000) NOT NULL, `email` varchar(512) NULL, `phone_number` varchar(17) NULL, UNIQUE INDEX `IDX_fc7b6dc314d349acb74a6124fe` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_fc7b6dc314d349acb74a6124fe` ON `staffs`')
    await queryRunner.query('DROP TABLE `staffs`')
  }
}
