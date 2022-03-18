import authService from "../Service/authSevice.js";
import ApiError from "../Exceptions/apiErrors.js";

import { validationResult } from "express-validator";

class controller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("validation error", errors.array()));
      }
      const reg = await authService.registration(req.body);

      /* res.cookie("refreshToken", candidate.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });*/
      return res.status(200).json(reg);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      console.log(activationLink);
      await authService.activate(activationLink);
      return res.redirect("http://localhost:3000/auth/login");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      console.log(req.headers);
      const candidate = await authService.login(req.body);
      /*  res.cookie(
        "refreshToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlseWFAZ3JlZW5jc29taWMuY29tIiwiaWQiOiI2MjMzMjQyNmE5NDczY2EyNDY5ZmU5NjEiLCJzdWNjZXNzZnVsbFBheW1uZXQiOnRydWUsImlzQWN0aXZhdGVkIjpmYWxzZSwidXNlcm5hbWUiOiJpbHlhcyIsInJvbGVzIjpbIlVTRVIiXSwicGF5bWVudElkIjoicGlfM0tlSTVaRjk1RTZ4R0ZwRDAzVkNGaFByX3NlY3JldF9aaFdZY2RtQTY3c2s3ZmVRR3R2MnVOVjdsIiwiaWF0IjoxNjQ3NTQ3NjgwLCJleHAiOjE2NTAxMzk2ODB9.wI4SWNkknSqjkl8ilEio_Y08ivXd54NLEws6Y-qWkCU", {
           maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
        secure: true,
        }
      );*/

      res.cookie("refreshToken", candidate.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json(candidate);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async logout(req, res) {
    try {
      const token = await authService.logout(req.cookie);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      console.log(error);
      //next(error);
    }
  }

  async refresh(req, res) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      console.log("************");
      console.log(refreshToken);
      const token = await authService.refresh(refreshToken);
      res.cookie("refreshToken", candidate.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
      res.status(400).json();
    }
  }
  async adminCheck(req, res) {
    try {
      const candidate = await authService.adminCheck(req.body);
      return res.status(200).json(candidate);
    } catch (error) {
      console.log(error);
      res.status(400).json();
    }
  }
  async getUsers(req, res) {
    try {
      const users = await authService.find();
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json();
    }
  }
  async getUserInformation(req, res) {
    try {
      const { refreshToken } = req.cookies;

      const candidate = await authService.getUserInformation(refreshToken);
      return res.status(200).json(candidate);
    } catch (error) {
      console.log(error);
      res.status(400).json();
    }
  }
  async activateUser(req, res) {
    console.log("Hello");
    const client_secret = localStorage.getItem("client_secret");
    console.log(client_secret);
    try {
      if (!req.body) {
        return res.status(400).json({ message: "error" });
      }
      const activate = await authService.activateUser(req.body);
      return res.status(200).json(activate);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}

export default new controller();
