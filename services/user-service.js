import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ApiError } from '../exeptions/api-error.js';
import { prisma } from '../prisma/prisma-client.js';
import UserDto from '../dtos/user-dto.js';

class UserService {
  async register(email, password, name) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw ApiError.BadRequest(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const userDto = new UserDto(user);
    console.log(`Пользователь с email ${email} успешно зарегистрирован`);
    return userDto;
  }
  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Неверный email или пароль');
    }
    console.log(password);
    console.log(user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw ApiError.BadRequest('Неверный email или пароль');
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    console.log(`Пользователь с email: ${email} успешно залогинен`);
    return token;
  }
  async current(id) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw ApiError.NotFound('Пользователь не найден');
    }
    const userDto = new UserDto(user);
    return userDto;
  }
}
export default new UserService();
