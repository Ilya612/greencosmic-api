import stripe from "stripe";
import authSevice from "../Service/authSevice.js";
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

  async webhook(req, res) {
    const event = req.body;
    console.log(event);
    // Handle the event
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
        console.log("создание платежа");
        console.log(created);
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
        const succeeded = event.data.object;
        console.log("Платеж прошел успешно");
        console.log(succeeded);
        await authSevice.activateUser(succeeded);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return res.status(200).json({ received: true });
  }
}
export default new paymentController();
