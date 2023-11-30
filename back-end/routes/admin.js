var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});
const bcrypt = require('bcryptjs');
const { generateAccessToken, authenticateToken } = require('../auth');



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

// POST /api/admin/login
router.post('/login', async(req, res) => {
    try {
      const dados = req.body;
      if (!'senha' in dados || !'email' in dados) {
        return res.status(401).json({
          error: "Email e senha são obrigatórios"
        });
      }
      const admin = await prisma.admin.findUniqueOrThrow({
        where: {
          cpf: dados.cpf
        }
      });
      const passwordCheck = await bcrypt.compare(
        dados.senha, admin.senha
      );
      if (!passwordCheck) {
        return res.status(401).json({
          error: "Email e/ou senha incorreto(s)"
        });
      }
      delete admin.senha;
      const jwt = generateAccessToken(admin);
      admin.accessToken = jwt;
      res.json(admin);
    }
    catch (exception) {
      console.log(exception)
      let error = exceptionHandler(exception);
      return res.status(error.code).json({
        error: error.message
      })
    }
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;