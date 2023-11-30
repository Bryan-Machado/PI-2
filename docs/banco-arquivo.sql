-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema STPSP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema STPSP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `STPSP` DEFAULT CHARACTER SET utf8 ;
USE `STPSP` ;

-- -----------------------------------------------------
-- Table `STPSP`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `STPSP`.`cliente` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cpf` CHAR(11) NOT NULL,
  `nomeCompleto` VARCHAR(45) NOT NULL,
  `acompanhante` VARCHAR(45) NULL,
  `acompanha` VARCHAR(45) NULL,
  `deficiencia` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `nascimento` DATE NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `numeroTel` INT NOT NULL,
  `tipoCarteirinha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `STPSP`.`motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `STPSP`.`motorista` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cpf` CHAR(11) NOT NULL,
  `nomeCompleto` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `nascimento` DATE NOT NULL,
  `numeroTel` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `STPSP`.`linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `STPSP`.`linha` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `localSaida` VARCHAR(45) NOT NULL,
  `localDestino` VARCHAR(45) NOT NULL,
  `horaSaida` TIME NOT NULL,
  `horaChegada` TIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
