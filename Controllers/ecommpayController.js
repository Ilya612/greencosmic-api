/*import EcommpayService from "../Service/ecommpayService.js";

class EcommpayController {
  async paymentCreate(req, res) {
    try {
      const payment = await EcommpayService.paymentCreate(req.body);
      return res.status(200).json(payment);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  async paymnetCallback(req, res) {
    try {
      const callback = await EcommpayService.paymentCallback(req.body);
      return res.status(200).json(callback);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
export default new EcommpayController();
*/
