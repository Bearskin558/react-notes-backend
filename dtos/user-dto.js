export default class UserDto {
  email;
  id;
  constructor(user) {
    this.email = user.email;
    this.id = user.id;
  }
}
