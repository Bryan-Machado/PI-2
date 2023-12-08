-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema stpsp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stpsp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stpsp` DEFAULT CHARACTER SET utf8 ;
USE `stpsp` ;

-- -----------------------------------------------------
-- Table `stpsp`.`agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`agendamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cidade` VARCHAR(45) NULL,
  `tipoCarteirinha` VARCHAR(45) NULL,
  `nomeCompleto` VARCHAR(45) NULL,
  `dia` DATE NULL,
  `hora` TIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `stpsp` ;

-- -----------------------------------------------------
-- Table `stpsp`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`admin` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`cliente` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cpf` CHAR(14) NOT NULL,
  `nomeCompleto` VARCHAR(45) NOT NULL,
  `acompanhante` VARCHAR(45) NULL DEFAULT NULL,
  `acompanha` VARCHAR(45) NULL DEFAULT NULL,
  `deficiencia` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nascimento` DATE NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `numeroTel` VARCHAR(20) NOT NULL,
  `tipoCarteirinha` VARCHAR(45) NOT NULL,
  `codCartao` VARCHAR(45) NOT NULL,
  `saldo` DECIMAL(10,2) NULL DEFAULT 0.00,
  `contador` INT(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC),
  UNIQUE INDEX `codCartao_UNIQUE` (`codCartao` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`linha` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `localSaida` VARCHAR(45) NOT NULL,
  `localDestino` VARCHAR(45) NOT NULL,
  `horaSaida` TIME NOT NULL,
  `horaChegada` TIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`motorista` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cpf` CHAR(14) NOT NULL,
  `nomeCompleto` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nascimento` DATE NOT NULL,
  `numeroTel` VARCHAR(20) NOT NULL,
  `fotoInput` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`onibus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`onibus` (
  `numero` INT(11) NOT NULL AUTO_INCREMENT,
  `placa` CHAR(7) NOT NULL,
  `linha_id` INT(11) NOT NULL,
  PRIMARY KEY (`numero`),
  UNIQUE INDEX `placa_UNIQUE` (`placa` ASC),
  INDEX `fk_onibus_linha1_idx` (`linha_id` ASC),
  CONSTRAINT `fk_onibus_linha1`
    FOREIGN KEY (`linha_id`)
    REFERENCES `stpsp`.`linha` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`motorista_onibus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`motorista_onibus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `data` DATETIME NOT NULL,
  `onibus_numero1` INT(11) NOT NULL,
  `motorista_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_motorista_onibus_onibus2_idx` (`onibus_numero1` ASC),
  INDEX `fk_motorista_onibus_motorista1_idx` (`motorista_id` ASC),
  CONSTRAINT `fk_motorista_onibus_motorista1`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `stpsp`.`motorista` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_motorista_onibus_onibus2`
    FOREIGN KEY (`onibus_numero1`)
    REFERENCES `stpsp`.`onibus` (`numero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`viagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`viagem` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `data` DATETIME NOT NULL,
  `linha_id` INT(11) NOT NULL,
  `motorista_id` INT(11) NOT NULL,
  `onibus_numero` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_viagem_linha1_idx` (`linha_id` ASC),
  INDEX `fk_viagem_motorista1_idx` (`motorista_id` ASC),
  INDEX `fk_viagem_onibus1_idx` (`onibus_numero` ASC),
  CONSTRAINT `fk_viagem_linha1`
    FOREIGN KEY (`linha_id`)
    REFERENCES `stpsp`.`linha` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_viagem_motorista1`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `stpsp`.`motorista` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_viagem_onibus1`
    FOREIGN KEY (`onibus_numero`)
    REFERENCES `stpsp`.`onibus` (`numero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stpsp`.`viagem_has_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stpsp`.`viagem_has_cliente` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `viagem_id` INT(11) NOT NULL,
  `cliente_id` INT(11) NOT NULL,
  `tarifa` DECIMAL(10,2) NOT NULL,
  `data` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_viagem_has_cliente_cliente1_idx` (`cliente_id` ASC),
  INDEX `fk_viagem_has_cliente_viagem1_idx` (`viagem_id` ASC),
  CONSTRAINT `fk_viagem_has_cliente_cliente1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `stpsp`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_viagem_has_cliente_viagem1`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `stpsp`.`viagem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
