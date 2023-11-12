var express = require('express');
var router = express.Router();

/* GET home page. */

// http://localhost:3000     OU     http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('site/pages/index');
});

// http://localhost:3000/atendimento
router.get('/atendimento', function(req, res, next) {
  res.render('site/pages/Atendimento');
});

// http://localhost:3000/esquecisenha
router.get('/esquecisenha', function(req, res, next) { 
  res.render('site/pages/Esqueci-minha-senha');
});

// http://localhost:3000/carteirinha
router.get('/carteirinha', function(req, res, next) {
  res.render('site/pages/Faça-sua-carteirinha');
});

// http://localhost:3000/logar
router.get('/logar', function(req, res, next) {
  res.render('site/pages/login');
});

// http://localhost:3000/recarregar
router.get('/recarregar', function(req, res, next) {
  res.render('site/pages/recarga-cartao');
});

// http://localhost:3000/sobre
router.get('/sobre', function(req, res, next) {
  res.render('site/pages/Sobre-nos');
});



module.exports = router;