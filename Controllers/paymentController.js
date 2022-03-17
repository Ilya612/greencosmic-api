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
        case "payment_intent.amount_capturable_updated":
          const amount_capturable_updated = event.data.object;
          // Then define and call a function to handle the event payment_intent.amount_capturable_updated
          break;
        case "payment_intent.canceled":
          const canceled = event.data.object;
          // Then define and call a function to handle the event payment_intent.canceled
          break;
        case "payment_intent.created":
          const created = event.data.object;
          // Then define and call a function to handle the event payment_intent.created
          break;
        case "payment_intent.payment_failed":
          const payment_failed = event.data.object;
          // Then define and call a function to handle the event payment_intent.payment_failed
          break;
        case "payment_intent.processing":
          const processing = event.data.object;
          // Then define and call a function to handle the event payment_intent.processing
          break;
        case "payment_intent.requires_action":
          const requires_action = event.data.object;
          // Then define and call a function to handle the event payment_intent.requires_action
          break;
        case "payment_intent.succeeded":
          console.log("pososi moy hui");
          const succeeded = event.data.object;
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      console.log("Eran Eyger");
      return res.status(200).json({ received: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}
export default new paymentController();
