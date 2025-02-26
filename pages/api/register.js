import userModel from "@/models/user";
import { throwRouteError } from "@/utils/api/errors";
import {
  send404Response,
} from "@/utils/api/responses";
import { connectToDB } from "@/configs/db";
import { generateToken, hashPassword } from "@/utils/api/auth";
import { sendNewUserToken, validateRegister } from "@/funcs/api/register";
await connectToDB();

const register = async (req, res) => {
  const payload = validateRegister(res, req.body);

  const hashedPassword = hashPassword(payload.password);
  payload.password = hashedPassword;

  const newUser = await userModel.create(payload);  
  const token = generateToken({
    identifier: newUser.username,
    password: newUser.password,
  })

  sendNewUserToken(res, token)
};


export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        await register(req, res);
        break
      default:
        throwRouteError(req.url, req.method);
    }
  } catch (error) {
    send404Response(res, error);
  }
};
