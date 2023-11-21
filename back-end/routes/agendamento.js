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
      
      const agendamento = await prisma.agendamento.findMany();
      res.status(200).json(agendamento)
  
    } catch (exception) {
      console.log(exception.message)
      console.log(exception)
      let error = exceptionHandler(exception)
      res.status(error.code).json({
        error: error.message
      })
    }
  });

  router.post('/agendar', async (req, res) => {

    try {
  
      const dados = req.body
      console.log(req.body)
  
      const agendamento = await prisma.agendamento.create({
        data: dados
      })
      console.log(agendamento)
      res.status(200).json(agendamento)
  
    } catch (exception) {
      console.log(exception.message)
      console.log(exception)
      let error = exceptionHandler(exception)
      res.status(error.code).json({
        error: error.message
      })
    }
    
  });