var express = require("express");
var router = express.Router();


// http://localhost:3000/admin   ||   http://localhost:3000/admin/
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
// http://localhost:3000/admin/login
router.get('/login', function(req, res, next) {
  res.render('admin/login');
});
// http://localhost:3000/admin/cadastrar-cliente
router.get("/cadastrar-cliente", function (req, res, next) {
  res.render("admin/form_validation"); 
});
// http://localhost:3000/admin/cadastrar-motorista
router.get("/cadastrar-motorista", function (req, res, next) {
  res.render("admin/form_funcionario");
});
// http://localhost:3000/admin/cadastrar-linha
router.get("/cadastrar-linha", function (req, res, next) {
  res.render("admin/form_linhas");
});
// http://localhost:3000/admin/lista-cliente
router.get("/lista-cliente", function (req, res, next) {
  res.render("admin/tables");
});
// http://localhost:3000/admin/lista-motorista
router.get("/lista-motorista", function (req, res, next) {
  res.render("admin/tables_dynamic");
});
// http://localhost:3000/admin/lista-linha
router.get("/lista-linha", function (req, res, next) {
  res.render("admin/tables_linhas");
});
// http://localhost:3000/admin/vizualizar-cliente/:id
router.get("/vizualizar-cliente/:id", function (req, res, next) {
  res.render("admin/vizualizar_cliente");
});

// http://localhost:3000/admin/editar-cliente/:id
router.get("/editar-cliente/:id", function (req, res, next) {
  res.render("admin/editar_cliente");
});

// http://localhost:3000/admin/deletar-cliente/:id
router.get("/deletar-cliente/:id", function (req, res, next) {
  res.render("admin/deletar_cliente");
});

// http://localhost:3000/admin/vizualizar-linha/:id
router.get("/vizualizar-linha/:id", function (req, res, next) {
  res.render("admin/vizualizar_linha");
});

// http://localhost:3000/admin/deletar-linha/:id
router.get("/deletar-linha/:id", function (req, res, next) {
  res.render("admin/deletar_linha");
});

// http://localhost:3000/admin/editar-linha/:id
router.get("/editar-linha/:id", function (req, res, next) {
  res.render("admin/editar_linha");
});

// http://localhost:3000/admin/vizualizar-motorista/:id
router.get("/vizualizar-motorista/:id", function (req, res, next) {
  res.render("admin/vizualizar_motorista");
});

// http://localhost:3000/admin/deletar-motorista/:id
router.get("/deletar-motorista/:id", function (req, res, next) {
  res.render("admin/deletar_motorista");
});

// http://localhost:3000/admin/editar-motorista/:id
router.get("/editar-motorista/:id", function (req, res, next) {
  res.render("admin/editar_motorista");
});

module.exports = router;
