-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `nomeCompleto` VARCHAR(191) NOT NULL,
    `acompanhante` VARCHAR(191) NULL,
    `acompanha` VARCHAR(191) NULL,
    `deficiencia` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `numeroTel` BIGINT NOT NULL,
    `tipoCarteirinha` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NULL DEFAULT 0,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motorista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `nomeCompleto` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `numeroTel` BIGINT NOT NULL,

    UNIQUE INDEX `Motorista_cpf_key`(`cpf`),
    UNIQUE INDEX `Motorista_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Linha` (
    `id` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `localSaida` VARCHAR(191) NOT NULL,
    `localDestino` VARCHAR(191) NOT NULL,
    `horaSaida` DATETIME(3) NOT NULL,
    `horaChegada` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Onibus` (
    `numero` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `linha_id` INTEGER NOT NULL,

    UNIQUE INDEX `Onibus_placa_key`(`placa`),
    UNIQUE INDEX `Onibus_numero_linha_id_key`(`numero`, `linha_id`),
    PRIMARY KEY (`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MotoristaOnibus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `onibus_numero` INTEGER NOT NULL,
    `motorista_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Viagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `linha_id` INTEGER NOT NULL,
    `onibus_numero` INTEGER NOT NULL,
    `onibus_linha_id` INTEGER NOT NULL,
    `motorista_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViagemHasCliente` (
    `viagem_id` INTEGER NOT NULL,
    `cliente_id` INTEGER NOT NULL,
    `tarifa` DOUBLE NOT NULL,
    `data` DATETIME(3) NOT NULL,

    PRIMARY KEY (`viagem_id`, `cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToViagem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToViagem_AB_unique`(`A`, `B`),
    INDEX `_ClienteToViagem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Onibus` ADD CONSTRAINT `Onibus_linha_id_fkey` FOREIGN KEY (`linha_id`) REFERENCES `Linha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MotoristaOnibus` ADD CONSTRAINT `MotoristaOnibus_onibus_numero_fkey` FOREIGN KEY (`onibus_numero`) REFERENCES `Onibus`(`numero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MotoristaOnibus` ADD CONSTRAINT `MotoristaOnibus_motorista_id_fkey` FOREIGN KEY (`motorista_id`) REFERENCES `Motorista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_linha_id_fkey` FOREIGN KEY (`linha_id`) REFERENCES `Linha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_onibus_numero_onibus_linha_id_fkey` FOREIGN KEY (`onibus_numero`, `onibus_linha_id`) REFERENCES `Onibus`(`numero`, `linha_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_motorista_id_fkey` FOREIGN KEY (`motorista_id`) REFERENCES `Motorista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViagemHasCliente` ADD CONSTRAINT `ViagemHasCliente_viagem_id_fkey` FOREIGN KEY (`viagem_id`) REFERENCES `Viagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ViagemHasCliente` ADD CONSTRAINT `ViagemHasCliente_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToViagem` ADD CONSTRAINT `_ClienteToViagem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToViagem` ADD CONSTRAINT `_ClienteToViagem_B_fkey` FOREIGN KEY (`B`) REFERENCES `Viagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
