DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog;

-- CREATE TABLE IF NOT EXISTS `blog`.`users` (
--     `id` VARCHAR(255) PRIMARY KEY NOT NULL,
--     `username` VARCHAR(255) NOT NULL,
--     `password` VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS `blog`.`posts` (
--     `id` VARCHAR(255) PRIMARY KEY NOT NULL,
--     `title` VARCHAR(255) NOT NULL,
--     `content` VARCHAR(255) NOT NULL,
--     `createdAt` VARCHAR(255) NOT NULL,
--     `updatedAt` VARCHAR(255) NOT NULL,
--     `postCreator` VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS `blog`.`comments` (
--     `id` VARCHAR(255) PRIMARY KEY NOT NULL,
--     `content` VARCHAR(255) NOT NULL,
--     `createdAt` VARCHAR(255) NOT NULL,
--     `updatedAt` VARCHAR(255) NOT NULL,
--     `postParent` VARCHAR(255) NOT NULL,
--     `commentCreator` VARCHAR(255) NOT NULL
-- )