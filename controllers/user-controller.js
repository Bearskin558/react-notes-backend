import { validationResult } from 'express-validator';

import userService from '../services/user-service.js';
import { checkValidationResult } from '../exeptions/checkValidationResult.js';
import checkAndReturnUserId from '../exeptions/checkAndReturnUserId.js';

class UserController {
  async register(req, res, next) {
    try {
      checkValidationResult(validationResult(req));
      const { email, password, name } = req.body;
      const user = await userService.register(email, password, name);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      checkValidationResult(validationResult(req));
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  async current(req, res, next) {
    try {
      const userId = checkAndReturnUserId(req);
      const user = await userService.current(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
