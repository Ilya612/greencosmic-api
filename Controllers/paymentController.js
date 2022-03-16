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
  async activate(req, res) {
    console.log("Hello");
    try {
      if (!req.body) {
        return res.status(400).json({ message: "error" });
      }
      const client_secret = localStorage.getItem("client_secret");
      console.log(client_secret);
      const activate = await paymentService.activate(req.body);
      return res.status(200).json(activate);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async webhook(req, res) {
    try {
      const event = req.body;
      console.log(event);
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      return res.status(200);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
export default new paymentController();
