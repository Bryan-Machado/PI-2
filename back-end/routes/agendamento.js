var express = require("express");
var router = express.Router();

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient({ errorFormat: "minimal" });

function exceptionHandler(e) {
  let error = {
    code: 500,
    message: "internal server error",
  };

  if (
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    error.code = 400;
    error.message = e.message;
  }

  return error;
}

router.get('/tabela', async (req, res) => {
  try {

    const agendamentos = await prisma.agendamento.findMany();
    res.status(200).json(agendamentos)

  } catch (exception) {
    console.log(exception.message)
    console.log(exception)
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

router.get("/", async (req, res) => {
  try {

    const agendamento = await prisma.agendamento.findMany({
      where: {
        dia: { 
          gte: new Date(),
        }
      },
      distinct: ['dia'],
    });

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

router.patch("/agendar/:id", async (req, res) => {
  try {
    const dados = req.body;
    const id = req.params.id
    console.log(req.body);

    const agendamento = await prisma.agendamento.update({
      data: dados,

      where: { 
        id: parseInt(id)
      }
    });
    console.log(agendamento);
    res.status(200).json(agendamento);
  } catch (exception) {
    console.log(exception.message);
    console.log(exception);
    let error = exceptionHandler(exception);
    res.status(error.code).json({
      error: error.message,
    });
  }
});

router.get("/horario/:diaEscolhido", async (req, res) => {
  try {
    let diaEscolhido = req.params.diaEscolhido
    diaEscolhido =  `${diaEscolhido}T00:00:00.000Z`
    const agendamento = await prisma.agendamento.findMany({
      where: { nomCompleto: null, 
        dia: diaEscolhido 
      },

    });

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

module.exports = router