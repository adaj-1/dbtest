-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: bookish_calgarian_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `Book_ID` bigint NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Price` decimal(6,2) NOT NULL,
  `ISBN` bigint NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Quality` varchar(255) NOT NULL,
  `Publication_date` date NOT NULL,
  `Written_language` varchar(255) NOT NULL,
  `Genre` varchar(255) NOT NULL,
  `Page_count` int DEFAULT NULL,
  `Word_count` int DEFAULT NULL,
  `Bookstore` varchar(255) NOT NULL,
  `Shelf` varchar(255) NOT NULL,
  `Buyer_ID` varchar(45) DEFAULT NULL,
  `Seller_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`Book_ID`),
  UNIQUE KEY `Book_ID_UNIQUE` (`Book_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Great Gatsby',3.99,9780333791035,'F. Scott Fitzgerald','Used','1925-04-10','English','Historical Fiction',208,47094,'Books Between Friends','ML 324.C54',NULL,'jada'),(2,'The Great Gatsby',10.99,9780333791035,'F. Scott Fitzgerald','New','1925-04-10','English','Historical Fiction',208,47094,'Peace Bridge Books','ML 325 .C24',NULL,'jada'),(3,'The Great Gatsby',10.99,9780333791035,'F. Scott Fitzgerald','New','1925-04-10','English','Historical Fiction',208,47094,'Dalhousie Books','ML 125 .C89','jada','jon'),(4,'Ninteen Eighty-Four',10.99,9780151660346,'George Orwell','New','1949-06-08','English','Science Fiction',416,NULL,'Dalhousie Books','ML 120 .C02','jada','joshua'),(5,'The Catcher in the Rye',26.47,9780316769532,'J. D. Salinger','New','1951-07-16','English','Young Adult Fiction',288,NULL,'Peace Bridge Books','ML 142 .W22',NULL,'joshua'),(6,'The Catcher in the Rye',26.49,9780316769532,'J. D. Salinger','New Condition','1951-07-16','Select Option','Young Adult (YA)',288,NULL,'Books Between Friends','ML 320 .A24',NULL,'jada'),(7,'The Catcher in the Rye',26.49,9780316769532,'J. D. Salinger','New Condition','1951-07-16','Select Option','Young Adult (YA)',288,NULL,'Books Between Friends','ML 320 .A24',NULL,'jada'),(8,'The Catcher in the Rye',26.49,9780316769532,'J. D. Salinger','New Condition','1951-07-16','Select Option','Young Adult (YA)',288,NULL,'Books Between Friends','ML 320 .A24',NULL,'jada');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-14 13:40:11
