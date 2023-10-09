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

/* GET api/linhas => lista todas as linhas */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST api/clientes/cadastrar => cadastra um cliente */
router.post('/cadastrar', async (req, res) => {

  try {

    const dados = req.body

    const cliente = await prisma.cliente.create({
      data: dados
    })
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
  
});

/* PUT api/clientes/atualizar/5 => atualiza TODOS OS DADOS do cliente de id 5 */
router.put('/atualizar/:id', async (req, res) => {
  
  try {
    const id = req.params.id
    const dados = req.body

    const cliente = await prisma.cliente.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/clientes/deletar/6 => deleta o cliente de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = req.params.id

    const cliente = await prisma.cliente.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

// resposta pra rotas nao existentes
router.all('*', (req, res) => { 
  res.status(501).end()                     // codigo 501 = rota nao implementada
});

module.exports = router;
