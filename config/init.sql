DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog;

CREATE TABLE IF NOT EXISTS `blog`.`users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32),
    `password` VARCHAR(100)
)

CREATE TABLE IF NOT EXISTS `blog`.`posts` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20),
    `content` VARCHAR(200),
    `createdAt` VARCHAR(100),
    `updatedAt` VARCHAR(100),
    `postCreator` VARCHAR(32) NOT NULL
)

CREATE TABLE IF NOT EXISTS `blog`.`comments` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(256),
    `createdAt` VARCHAR(100),
    `updatedAt` VARCHAR(100),
    `postParent` INT NOT NULL,
    `commentCreator` VARCHAR(32) NOT NULL
)