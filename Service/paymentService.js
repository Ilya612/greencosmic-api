import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51KRcjgF95E6xGFpDuW7v59vc0UqWSbdDoncF2vkGSB6DYqNWq1vi7a2ZOv9YU8oZdV2OLXPCFsyrxyjZRnhUdZQs00hRH7b4Lj"
);
class paymentService {
  async paymentIntent(items) {
    const calculateOrderAmount = (items) => {
      return 1400;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent.client_secret;
  }
}
export default new paymentService();
