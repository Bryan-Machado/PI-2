var express = require('express');
var router = express.Router();

/* GET home page. */

// http://localhost:3000     OU     http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('site/pages/index', { title: 'Express' });
});

// http://localhost:3000/atendimento
router.get('/atendimento', function(req, res, next) {
  res.render('site/pages/Atendimento', {  layout: 'layouts/layout.ejs'  });
});

// http://localhost:3000/esquecisenha
router.get('/esquecisenha', function(req, res, next) { 
  res.render('site/pages/Esqueci-minha-senha', {  layout: 'layouts/layout1.ejs'  });
});

// http://localhost:3000/carteirinha
router.get('/carterinha', function(req, res, next) {
  res.render('site/pages/Faça-sua-carterinha', {  layout: 'layouts/layout.ejs'  });
});

// http://localhost:3000/home
router.get('/home', function(req, res, next) {
  res.render('site/pages/index', {  layout: 'layouts/layout.ejs'  });
});

// http://localhost:3000/logar
router.get('/logar', function(req, res, next) {
  res.render('site/pages/login', {  layout: 'layouts/layout1.ejs'  });
});

// http://localhost:3000/recarregar
router.get('/recarregar', function(req, res, next) {
  res.render('site/pages/recarga-cartao', {  layout: 'layouts/layout.ejs'  });
});

// http://localhost:3000/sobre
router.get('/sobre', function(req, res, next) {
  res.render('site/pages/Sobre-nos', {  layout: 'layouts/layout.ejs'  });
});



module.exports = router;