import nodemailer from "nodemailer";

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "greencosmicgreencosmic@gmail.com",
        pass: "greencosmic2022greencosmic",
      },
    });
  }
  async sendActivationMail(email, activationLink) {
    try {
      await this.transporter.sendMail({
        from: "greencosmicgreencosmic@gmail.com",
        to: email,
        subject: "Activation",
        text: "",
        html: activationLink,
        /*"<div>Follow the link to activate your account:</div><a href=" +
          "'" +
          activationLink +
          "'" +
          ">" +
          activationLink +
          "</a>" 
          ,*/
      });
    } catch (error) {
      console.log(error);
    }
  }
  async sendInf(user) {
    try {
      await this.transporter.sendMail({
        from: "greencosmicgreencosmic@gmail.com",
        to: email,
        subject: "Information",
        text:
          "Your password: " +
          user.password +
          "\n Your username: " +
          user.username +
          "\n Your Email: " +
          user.email,
        /*html: activationLink,
        "<div>Follow the link to activate your account:</div><a href=" +
          "'" +
          activationLink +
          "'" +
          ">" +
          activationLink +
          "</a>" 
          ,*/
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
export default new mailService();
