/*
  Warnings:

  - A unique constraint covering the columns `[order_id,product_size_id]` on the table `orders_products_sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `user_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `orders_products_sizes_order_id_product_size_id_key` ON `orders_products_sizes`(`order_id`, `product_size_id`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
