var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});
const uploadSingle = require('../middleware/uploadSingle');

// /api/motoristas/upload
router.post('/', uploadSingle, async (req, res) =>{
  try {
    const data = req.body;
    if (!data.password || data.password.length < 8) {
      return res.status(400).json({
        error: "A senha é obrigatória e deve conter no mínimo 8 caracteres!"
      });
    }

    const upload = req.upload || null;
    if (upload) {
      console.log(upload); // Exibe o objeto upload no terminal.
      data.image = upload.customPath; // Acrescenta o caminho para salvar no banco de dados.
    }

    const user = await prisma.user.create({
      data: data
    });

    const baseUrl = `${req.protocol}://${req.headers.host}`; // Obtém o base URL do servidor.
    user.image = `${baseUrl}/${user.image}`; // Monta o caminho completo para acesso ao arquivo.

    // const jwt = generateAccessToken(user);
    // user.accessToken = jwt;
    res.status(201).json(user);
  }
  catch (exception) {
    let error = exceptionHandler(exception);
    res.status(error.code).json({
      error: error.message
    });
  }
});

module.exports = router;
