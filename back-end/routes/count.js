var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});

function exceptionHandler(e) {
  let error = {
    code: 500,
    message: 'internal server error'
  }
  
  if (
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    error.code = 400;
    error.message = e.message
  }

  return error
}

router.get('/', async (req, res) => {
    try {
        const clientes = await prisma.cliente.count();
        const motoristas = await prisma.motorista.count();
        const linhas = await prisma.linha.count();

        const dados = {
            clientes,
            motoristas,
            linhas
        };
    
        res.json(dados);
    } catch (error) {
        
    }
})

// resposta pra rotas nao existentes
router.all('*', (req, res) => { 
  res.status(501).end()                     // codigo 501 = rota nao implementada
});

module.exports = router;
