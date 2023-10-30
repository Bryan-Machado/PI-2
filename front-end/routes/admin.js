var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});

router.get("/cadastrar-cliente", function (req, res, next) {
  res.render("admin/form_validation");
});

router.get("/cadastrar-motorista", function (req, res, next) {
  res.render("admin/form_funcionario");
});

router.get("/cadastrar-linha", function (req, res, next) {
  res.render("admin/form_linhas");
});

router.get("/lista-cliente", function (req, res, next) {
  res.render("admin/tables");
});

router.get("/lista-motorista", function (req, res, next) {
  res.render("admin/tables_dynamic");
});

router.get("/lista-linha", function (req, res, next) {
  res.render("admin/tables_linhas");
});


module.exports = router;
