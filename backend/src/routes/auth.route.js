const express = require('express');
const controller = require('../controllers/auth.controller');
const {
  loginLimiter,
  refreshLimiter,
  logoutLimiter,
} = require('../middleware/rate-limit.middleware');

const router = express.Router();
router.post('/check-mst', controller.checkMst); 
router.post('/login', loginLimiter, controller.login);
router.post('/refresh', refreshLimiter, controller.refresh);
router.post('/logout', logoutLimiter, controller.logout);

module.exports = router;
