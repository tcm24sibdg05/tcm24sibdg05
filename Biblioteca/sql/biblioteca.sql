-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: biblioteca
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `dataDeInicio` date NOT NULL,
  `dataDeDevolucaoPrevista` date NOT NULL,
  `dataDeDevolucaoReal` date DEFAULT NULL,
  `renovacao` tinyint(1) DEFAULT '0',
  `numeroDeUtilizador` int NOT NULL,
  `codigoInterno` int NOT NULL,
  `codigoISBN` char(13) NOT NULL,
  `numeroDeCopia` int NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `numeroDeUtilizador` (`numeroDeUtilizador`),
  KEY `codigoInterno` (`codigoInterno`),
  KEY `codigoISBN` (`codigoISBN`,`numeroDeCopia`),
  CONSTRAINT `emprestimo_ibfk_1` FOREIGN KEY (`numeroDeUtilizador`) REFERENCES `utilizador` (`numeroDeUtilizador`),
  CONSTRAINT `emprestimo_ibfk_2` FOREIGN KEY (`codigoInterno`) REFERENCES `funcionario` (`codigoInterno`),
  CONSTRAINT `emprestimo_ibfk_3` FOREIGN KEY (`codigoISBN`, `numeroDeCopia`) REFERENCES `exemplar` (`codigoISBN`, `numeroDeCopia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo`
--

LOCK TABLES `emprestimo` WRITE;
/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
INSERT INTO `emprestimo` VALUES (1,'2025-05-26','2025-06-02',NULL,0,1,1,'9781234567897',1);
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exemplar`
--

DROP TABLE IF EXISTS `exemplar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exemplar` (
  `codigoISBN` char(13) NOT NULL,
  `numeroDeCopia` int NOT NULL,
  `estado` enum('Disponível','Emprestado','Danificado') DEFAULT 'Disponível',
  PRIMARY KEY (`codigoISBN`,`numeroDeCopia`),
  CONSTRAINT `exemplar_ibfk_1` FOREIGN KEY (`codigoISBN`) REFERENCES `livro` (`codigoISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exemplar`
--

LOCK TABLES `exemplar` WRITE;
/*!40000 ALTER TABLE `exemplar` DISABLE KEYS */;
INSERT INTO `exemplar` VALUES ('9781234567897',1,'Disponível');
/*!40000 ALTER TABLE `exemplar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `codigoInterno` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `funcao` varchar(100) NOT NULL,
  PRIMARY KEY (`codigoInterno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (1,'Carlos Mendes','Bibliotecário');
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro`
--

DROP TABLE IF EXISTS `livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livro` (
  `codigoISBN` char(13) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `anoDePublicacao` int DEFAULT NULL,
  `edicao` varchar(50) NOT NULL,
  `genero` varchar(100) NOT NULL,
  PRIMARY KEY (`codigoISBN`),
  CONSTRAINT `livro_chk_1` CHECK ((`anoDePublicacao` >= 1500))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES ('9781234567897','A Máquina do Tempo','H.G. Wells',1895,'1ª','Ficção Científica');
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localizacao`
--

DROP TABLE IF EXISTS `localizacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localizacao` (
  `codigoISBN` char(13) NOT NULL,
  `numeroDeCopia` int NOT NULL,
  `corredor` varchar(10) NOT NULL,
  `estante` varchar(10) NOT NULL,
  `prateleira` varchar(10) NOT NULL,
  PRIMARY KEY (`codigoISBN`,`numeroDeCopia`),
  CONSTRAINT `localizacao_ibfk_1` FOREIGN KEY (`codigoISBN`, `numeroDeCopia`) REFERENCES `exemplar` (`codigoISBN`, `numeroDeCopia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localizacao`
--

LOCK TABLES `localizacao` WRITE;
/*!40000 ALTER TABLE `localizacao` DISABLE KEYS */;
INSERT INTO `localizacao` VALUES ('9781234567897',1,'B','2','3');
/*!40000 ALTER TABLE `localizacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalizacao`
--

DROP TABLE IF EXISTS `penalizacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalizacao` (
  `codigoDePenalizacao` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('Multa','Suspensão','Bloqueio') NOT NULL,
  `data` date NOT NULL,
  `motivo` text NOT NULL,
  `codigoEmprestimo` int NOT NULL,
  PRIMARY KEY (`codigoDePenalizacao`),
  KEY `codigoEmprestimo` (`codigoEmprestimo`),
  CONSTRAINT `penalizacao_ibfk_1` FOREIGN KEY (`codigoEmprestimo`) REFERENCES `emprestimo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalizacao`
--

LOCK TABLES `penalizacao` WRITE;
/*!40000 ALTER TABLE `penalizacao` DISABLE KEYS */;
INSERT INTO `penalizacao` VALUES (1,'Multa','2025-06-10','Atraso na devolução',1);
/*!40000 ALTER TABLE `penalizacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `dataDeExpiracao` date NOT NULL,
  `numeroDeUtilizador` int NOT NULL,
  `codigoISBN` char(13) NOT NULL,
  `codigoInterno` int NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `numeroDeUtilizador` (`numeroDeUtilizador`),
  KEY `codigoISBN` (`codigoISBN`),
  KEY `codigoInterno` (`codigoInterno`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`numeroDeUtilizador`) REFERENCES `utilizador` (`numeroDeUtilizador`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`codigoISBN`) REFERENCES `livro` (`codigoISBN`),
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`codigoInterno`) REFERENCES `funcionario` (`codigoInterno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,'2025-05-26','10:00:00','2025-06-01',1,'9781234567897',1);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizador`
--

DROP TABLE IF EXISTS `utilizador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilizador` (
  `numeroDeUtilizador` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo` enum('Aluno','Professor','Funcionário') NOT NULL,
  `contacto` varchar(100) NOT NULL,
  PRIMARY KEY (`numeroDeUtilizador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizador`
--

LOCK TABLES `utilizador` WRITE;
/*!40000 ALTER TABLE `utilizador` DISABLE KEYS */;
INSERT INTO `utilizador` VALUES (1,'Joana Silva','Aluno','joana.silva@mail.com');
/*!40000 ALTER TABLE `utilizador` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 21:12:37
