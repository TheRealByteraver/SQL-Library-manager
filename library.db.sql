DROP TABLE IF EXISTS SequelizeMeta;

CREATE TABLE IF NOT EXISTS SequelizeMeta (
	name VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (name)
);
DROP TABLE IF EXISTS `Books`;
CREATE TABLE IF NOT EXISTS `Books` (
	`id` INTEGER NOT NULL AUTO_INCREMENT, 
	`title` VARCHAR(255) NOT NULL, `author` VARCHAR(255) NOT NULL, 
	`genre` VARCHAR(255), `year` INTEGER, `createdAt` DATETIME NOT NULL, 
	`updatedAt` DATETIME NOT NULL, 
	PRIMARY KEY(`id`)
)


INSERT INTO `SequelizeMeta` (`name`) VALUES ('20180919233319-create-book.js');
INSERT INTO `Books` (`id`,`title`,`author`,`genre`,`year`,`createdAt`,`updatedAt`) VALUES (1,'The Hunger Games','Suzanne Collins','Fantasy',2008,'',''),
 (2,'Catching Fire','Suzanne Collins','Fantasy',2009,'',''),
 (3,'Mockingjay','Suzanne Collins','Fantasy',2010,'',''),
 (4,'The Ballad of Songbirds and Snakes','Suzanne Collins','Fantasy',2020,'',''),
 (5,'The Memory Police','Yoko Ogawa','Science Fiction',1994,'',''),
 (6,'Nickel Boys','Colson Whitehead','Historical Fiction',2019,'',''),
 (7,'The Book of Unknown Americans','Cristina Henriquez','Fiction',2014,'',''),
 (8,'A Brief History of Time','Stephen Hawking','Non Fiction',1988,'',''),
 (9,'The Universe in a Nutshell','Stephen Hawking','Non Fiction',2001,'',''),
 (10,'Frankenstein','Mary Shelley','Horror',1818,'',''),
 (11,'The Martian','Andy Weir','Science Fiction',2014,'',''),
 (12,'Ready Player One','Ernest Cline','Science Fiction',2011,'',''),
 (13,'Armada','Ernest Cline','Science Fiction',2015,'',''),
 (14,'Pride and Prejudice','Jane Austen','Classic',1813,'',''),
 (15,'Emma','Jane Austen','Classic',1815,'',''),
 (30,'Heya','Erlando','definitely fiction',1998,'2021-06-26 20:23:17.830 +00:00','2021-09-14 15:21:46.262 +00:00'),
 (32,'Van de hak op de tak','Godfried Bomans','short stories',1965,'2021-09-14 15:14:42.402 +00:00','2021-09-20 13:54:19.872 +00:00');
