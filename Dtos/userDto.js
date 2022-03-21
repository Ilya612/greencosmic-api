export default class UserDto {
  email;
  id;
  successfullPaymnet;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.username = model.username;
    this.roles = model.roles;
    this.successfullPaymnet = model.successfullPaymnet;
    this.paymentId = model.paymentId;
    this.birthday = model.birthday;
    this.phoneNumber = model.phoneNumber;
    this.city = model.city;
    this.linkFacebook = model.linkFacebook;
    this.linkLinkedIn = model.linkLinkedIn;
    this.linkInstagram = model.linkInstagram;
  }
}
