import { ObjectId } from 'mongodb';
import { ApiError } from './api-error.js';

const checkAndReturnUserId = (req) => {
  const userId = req.user.userId;
  if (!ObjectId.isValid(userId)) {
    throw ApiError.BadRequest('Неверный id пользователя');
  }
  return userId;
};
export default checkAndReturnUserId;
