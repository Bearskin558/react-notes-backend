export const schemaRegistration = {
  email: {
    errorMessage: 'Введите валидный email',
    isEmail: true,
  },
  password: {
    isLength: {
      options: { min: 6, max: 20 },
      errorMessage: 'Пароль должен быть от 6 до 20 символов',
    },
  },
};

export const schemaLogin = {
  email: {
    errorMessage: 'Введите валидный email',
    isEmail: true,
  },
  password: {
    isLength: {
      options: { min: 6, max: 20 },
      errorMessage: 'Пароль должен быть от 6 до 20 символов',
    },
  },
};
