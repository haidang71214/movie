-- CreateTable
CREATE TABLE `banner` (
    `banner_id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NULL,
    `image_url` VARCHAR(255) NULL,

    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`banner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `account_id` INTEGER NOT NULL,
    `show_id` INTEGER NOT NULL,
    `seat_id` INTEGER NOT NULL,

    INDEX `seat_id`(`seat_id`),
    INDEX `show_id`(`show_id`),
    PRIMARY KEY (`account_id`, `show_id`, `seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cinema_cluster` (
    `cluster_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cluster_name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    `system_id` INTEGER NULL,

    INDEX `system_id`(`system_id`),
    PRIMARY KEY (`cluster_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cinema_room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(255) NOT NULL,
    `cluster_id` INTEGER NULL,

    INDEX `cluster_id`(`cluster_id`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cinema_system` (
    `system_id` INTEGER NOT NULL AUTO_INCREMENT,
    `system_name` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(255) NULL,

    PRIMARY KEY (`system_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie` (
    `movie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_name` VARCHAR(255) NOT NULL,
    `trailer` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `release_date` DATE NULL,
    `rating` INTEGER NULL,
    `is_hot` BOOLEAN NULL DEFAULT false,
    `is_showing` BOOLEAN NULL DEFAULT false,
    `is_coming` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seat` (
    `seat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `seat_name` VARCHAR(50) NULL,
    `seat_type` VARCHAR(50) NULL,
    `room_id` INTEGER NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `show_time` (
    `show_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `movie_id` INTEGER NULL,
    `show_datetime` DATETIME(0) NULL,
    `ticket_price` INTEGER NULL,

    INDEX `movie_id`(`movie_id`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`show_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phone_number` VARCHAR(20) NULL,
    `password` VARCHAR(255) NULL,
    `user_type` VARCHAR(50) NULL,
    `refresh_token` TEXT NULL,
    `face_id` VARCHAR(225) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `banner` ADD CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `users`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `show_time`(`show_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`seat_id`) REFERENCES `seat`(`seat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cinema_cluster` ADD CONSTRAINT `cinema_cluster_ibfk_1` FOREIGN KEY (`system_id`) REFERENCES `cinema_system`(`system_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cinema_room` ADD CONSTRAINT `cinema_room_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `cinema_cluster`(`cluster_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `seat` ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `cinema_room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `show_time` ADD CONSTRAINT `show_time_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `cinema_room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `show_time` ADD CONSTRAINT `show_time_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie`(`movie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
