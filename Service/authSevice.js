import User from "../Models/user.js";
import role from "../Models/role.js";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import UserDto from "../Dtos/userDto.js";
import ApiError from "../Exceptions/apiErrors.js";
import EcommpayService from "./ecommpayService.js";
import PaymentService from "./paymentService.js";

import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

class authService {
  async registration(body) {
    const candidate = await User.findOne({ email: body.email });
    if (candidate) {
      throw ApiError.BadRequest("email is already registrated");
    }

    const hashPassword = bcrypt.hashSync(body.password, 7);
    const userRole = await role.findOne({ value: "USER" });
    const activationLink = uuid();

    const stripePayment = await PaymentService.paymentIntent({
      items: { id: "course" },
    });
    if (!stripePayment) {
      throw ApiError.BadRequest("bad request");
    }

    /* const paymentInformation = await EcommpayService.paymentCreate();
    if (!paymentInformation) {
      throw ApiError.BadRequest("bad request");
    }*/
    const user = new User({
      username: body.username,
      password: hashPassword,
      email: body.email,
      roles: [userRole.value],
      successfullPaymnet: false,
      paymentId: stripePayment,
    });
    await user.save();

    /*  await mailService.sendActivationMail(
      body.email,
      "http://localhost:3001/api/activate/" + activationLink
    );*/
    /*await mailService.sendInf({
      username: user.username,
      password: user.password,
      email: body.email,
    });*/
    /*const userDto = new UserDto(user); // id, email, isActivated

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);*/

    return { client_secret: stripePayment };
  }
  async activateUser(succeeded) {
    const activate = await User.findOne({ paymentId: succeeded.client_secret });
    /*  const activate = await User.updateOne({
      paymentId: succeeded.client_secret,
    });*/

    if (!activate) {
      throw ApiError.BadRequest("Uncorrect link");
    }
    activate.successfullPaymnet = true;
    await activate.save();
    //await mailService.sendActivationMail({email: activate.email, })
    return;
  }
  /* async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Uncorrect link");
    }
    user.isActivated = true;
    await user.save();
  }*/
  async login(body) {
    const candidate = await User.findOne({ email: body.email });
    if (!candidate) {
      throw ApiError.BadRequest("User not found");
    }
    // const match = await bcrypt.compare(password, user.passwordHash);

    const isPasEquals = await bcrypt.compare(body.password, candidate.password);
    if (!isPasEquals) {
      throw ApiError.BadRequest("Uncorrect password");
    }

    const userDto = new UserDto(candidate);

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(body) {
    const token = await tokenService.removeToken(body.refreshToken);

    return token;
  }
  async checkAdmin(body) {
    const user = await User.findById(body);
    return user;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthError();
    }

    const token = await tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!token || !tokenFromDb) {
      throw ApiError.UnauthError();
    }

    const candidate = await User.findById(token.id);
    const userDto = new UserDto(candidate);

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async find() {
    const users = await User.find();
    return users;
  }
  async getUserInformation(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthError();
    }
    const user = tokenService.validateRefreshToken(refreshToken);
    console.log(user);
    if (!user) {
      throw ApiError.UnauthError();
    }
    return user;
  }
}
export default new authService();
