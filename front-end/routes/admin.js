var express = require("express");
var router = express.Router();

router.get("/cadastrar-cliente", function (req, res, next) {
  res.render("admin/gentelella-master/production/form_validation");
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
