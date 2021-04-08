"use strict";
exports.__esModule = true;
var express_1 = require("express");
var routes_1 = require("./routes");
var router = express_1.Router({ mergeParams: true });
router.use(routes_1["default"]);
exports["default"] = router;
