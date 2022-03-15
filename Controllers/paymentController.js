import stripe from "stripe";
import paymentService from "../Service/paymentService.js";

class paymentController {
  async paymentCreate(req, res) {
    try {
      console.log(req.body);
      const { items } = req.body;
      const payment = await paymentService.paymentIntent(items);
      return res.send({ clientSecret: payment });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
export default new paymentController();
