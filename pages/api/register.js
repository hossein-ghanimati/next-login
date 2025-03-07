import userModel from "@/models/user";
import { throwRouteError } from "@/utils/api/errors";
import {
  send404Response,
} from "@/utils/api/responses";
import { connectToDB } from "@/configs/db";
import { generateToken, hashPassword } from "@/utils/api/auth";
import { checkIsFirstUser, sendNewUserToken, validateRegister } from "@/funcs/api/register";
await connectToDB();

const register = async (req, res) => {
  const payload = validateRegister(res, req.body);

  

  const isFirstUser = await checkIsFirstUser();
  payload.role = isFirstUser ? "ADMIN" : "USER";

  const hashedPassword = hashPassword(payload.password);
  payload.password = hashedPassword;

  const newUser = await userModel.create(payload);  
  const {_id, tokenVersion} = newUser;

  const token = generateToken({
    _id,
    tokenVersion,
  })

  req.cookies
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
