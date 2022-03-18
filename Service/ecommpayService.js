/*import { Payment } from "ecommpay";
import { Callback } from "ecommpay";
import { v4 as uuid } from "uuid";
import User from "../Models/user.js";
import ApiError from "../Exceptions/apiErrors.js";
import MailService from "./mailService.js";

class EcommpayService {
  async paymentCreate(body) {
    const e = new Payment(
      "59842",
      "e1faaa4a9e2c23b3e6c2cb920164519379a1503c595bbe15b19eeb8d7bed9fbf29cc51b0c7711af6db396af85a8ed0cea86b885e75c6093388edceaa80fda3de"
    );
    const id = uuid();
    console.log(id);
    console.log(typeof id);
    e.paymentAmount = 1000;
    e.paymentId = id;
    e.paymentCurrency = "USD";
    const url = e.getUrl();
    const paymentId = e.params.payment_id;

    return { url, paymentId };
  }
  async paymentCallback(body) {
    console.log(body);
    const callback = new Callback(
      "e1faaa4a9e2c23b3e6c2cb920164519379a1503c595bbe15b19eeb8d7bed9fbf29cc51b0c7711af6db396af85a8ed0cea86b885e75c6093388edceaa80fda3de",
      body
    );

    if (callback.isPaymentSuccess()) {
      const paymentCont = callback.payment(); // Getting payment contence
      const paymentId = callback.getPaymentId(); // Getting payment ID
      const user = await User.findOne({ paymentId });
      if (!user) {
        ApiError.BadRequest("Smth went wrong");
      }
      user.successfullPaymnet = true;
      await user.save();
      await MailService.sendInf({
        username: user.username,
        password: user.password,
        email: user.email,
      });
      // Add your code for proccessing successful payment
      console.log({ paymentCont, paymentId });
      return { paymentCont, paymentId };
    }
    return;
  }
}
export default new EcommpayService();
*/
