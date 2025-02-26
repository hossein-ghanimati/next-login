import { findUser, validateLogin, validateUserPass } from "@/funcs/api/login";

import { throwRouteError } from "@/utils/api/errors";
import { send404Response } from "@/utils/api/responses";

const login = async (req, res) => {
  const payload = validateLogin(res, req.body);

  const user = await findUser(payload);

  validateUserPass(payload.password, user.password);

  sendUser(res, user);
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
