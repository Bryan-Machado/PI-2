var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient({errorFormat: 'minimal'});
const bcrypt = require('bcryptjs');
const { generateAccessToken, authenticateToken } = require('../auth');

function exceptionHandler(e) {
  console.log(e);
  let error = {
    code: 500,
    message: "Internal Server Error"
  }
  if (
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientValidationError
    ) {
      error.code = 400;
      error.message = e.message;
    }
  
  return error;
}

/* GET /api/users */
router.get('/', async (req, res) => {
  try {
    const USERS_PER_PAGE = 50;
    const page = Number(req.query.page) || 1;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true
      },
      take: USERS_PER_PAGE,
      skip: (page - 1) * USERS_PER_PAGE,
    });
    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  
    res.json({
      users,
      page,
      totalPages,
      totalUsers,
    });
  }
  catch(exception) {
    let error = exceptionHandler(exception);
    res.status(error.code).json({
      error: error.message
    });
  }
});

// /api/users
router.post('/', async (req, res) =>{
  try {
    const data = req.body;
    if (!data.password || data.password.lenght < 8) {
      return res.status(400).json({
        error: "A senha é obrigatória e deve conter no mínimo 8 caracteres!"
      });
    }
    data.password = await bcrypt.hash(data.password, 10);

    const upload = req.upload || null;
    if (upload){
      console.log(upload);

      data.image = upload.path;
    }

    const user = await prisma.user.create({
      data: data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    });
    const jwt = generateAccessToken(user);
    user.accessToken = jwt;
    res.status(201).json(user);
  }
  catch (exception) {
    let error = exceptionHandler(exception);
    res.status(error.code).json({
      error: error.message
    });
  }
});

// GET /api/users/{id}
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true
      }
    });
    res.json(user);
  }
  catch (exception) {
     let error = exceptionHandler(exception);
     res.status(error.code).json({
      error: error.message
     });
  }
});

// PATCH /api/users/{id}
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const token = req.accessToken;
    // console.log(token);
    const checkUser = await prisma.user.findUnique({
      where: {
        id: id,
        email: token.email
      }
    });
    console.log(checkUser);
    if (checkUser === null || id !== token.id) {
      return res.sendStatus(403);
    }
  
    if ('password' in data) {
      if (data.password.lenght < 8) {
        return res.status(400).json({
          error: "A senha deve conter no mínimo 8 caracteres"
        });
      }
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: data,
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    res.json(user);
  }
  catch (exception) {
    let error = exceptionHandler(exception);
    res.status(error.code).json({
      error: error.message
    })
  }
});

// DELETE /api/users/{id}
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    });
    res.status(204).end(); // 204 No Content
  }
  catch (exception) {
     let error = exceptionHandler(exception);
     res.status(error.code).json({
      error: error.message
     });
  }
});

// POST /api/users/login
router.post('/login', async(req, res) => {
  try {
    const data = req.body;
    if (!'password' in data || !'email' in data) {
      return res.status(401).json({
        error: "Usuário e senha são obrigatórios"
      });
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email
      }
    });
    const passwordCheck = await bcrypt.compare(
      data.password, user.password
    );
    if (!passwordCheck) {
      return res.status(401).json({
        error: "Usuário e/ou senha incorreto(s)"
      });
    }
    delete user.password;
    const jwt = generateAccessToken(user);
    user.accessToken = jwt;
    res.json(user);
  }
  catch (exception) {
    let error = exceptionHandler(exception);
    return res.status(error.code).json({
      error: error.message
    })
  }
});

// Resposta para as rotas não existentes.
router.all('*', (req, res) => {
  res.status(501).end(); // 501 Not Implemented.
});


module.exports = router;
