var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});

router.get("/cadastrar-cliente", function (req, res, next) {
  res.render("admin/form_validation");
});

router.get("/cadastrar-motorista", function (req, res, next) {
  res.render("admin/cadastrar-motorista");
});

router.get("/cadastrar-linha", function (req, res, next) {
  res.render("admin/cadastrar-linha");
});

router.get("/lista-cliente", function (req, res, next) {
  res.render("admin/lista-cliente");
});


module.exports = router;
