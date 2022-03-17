export default class UserDto {
  email;
  id;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.username = model.username;
    this.roles = model.roles;
    this.paymentId = model.paymentId;
    this.successfullPaymnet = model.successfullPaymnet;
  }
}
