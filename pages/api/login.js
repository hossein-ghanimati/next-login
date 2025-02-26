import { connectToDB } from "@/configs/db";
import { findUser, sendUserToken, validateLogin, validateUserPass } from "@/funcs/api/login";
import { generateToken } from "@/utils/api/auth";

import { throwRouteError } from "@/utils/api/errors";
import { send404Response } from "@/utils/api/responses";
await connectToDB();

const login = async (req, res) => {
  const payload = validateLogin(res, req.body);

  const user = await findUser(payload);
  validateUserPass(res, payload.password, user.password);

  const {_id, tokenVersion} = user;
  const token = generateToken({
    _id,
    tokenVersion,
  })

  sendUserToken(res, token);
};

export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        await login(req, res);
        break;
      default:
        throwRouteError(req.url, req.method);
    }
  } catch (error) {
    send404Response(res, error);
  }
};
