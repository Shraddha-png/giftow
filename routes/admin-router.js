const express = require("express");
const getAllProducts = require("../controllers/admin-controller"); // Make sure this matches the new name
const router = express.Router();

router.route('/products').get(getAllProducts);

module.exports = router;