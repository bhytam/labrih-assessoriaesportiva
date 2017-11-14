"use strict";

module.exports = function (app) {
    var userController = require("../controllers/userController");
    app.route("/authenticate").post(userController.authenticate);
}