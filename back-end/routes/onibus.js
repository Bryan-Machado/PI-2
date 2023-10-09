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

/* POST api/onibus/cadastrar => cadastra um onibus */
router.post('/cadastrar', async (req, res) => {

  try {

    const dados = req.body

    const onibus = await prisma.onibus.create({
      data: dados
    })
    res.status(200).json(onibus)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
  
});

/* PUT api/onibus/atualizar/5 => atualiza TODOS OS DADOS do onibus de id 5 */
router.put('/atualizar/:id', async (req, res) => {
  
  try {
    const id = req.params.id
    const dados = req.body

    const onibus = await prisma.onibus.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(onibus)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/onibus/deletar/6 => deleta o onibus de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = req.params.id

    const onibus = await prisma.onibus.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(onibus)

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
