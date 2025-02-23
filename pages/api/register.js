import userModel from "@/models/user";
import { throwRouteError } from "@/utils/api/errors";
import {
  send404Response,
  sendValidationErrorResponse,
} from "@/utils/api/responses";
import { userSchema } from "@/validation/user";
import { connectToDB } from "@/configs/db";
import { hashPassword } from "@/utils/api/auth";
await connectToDB();

const registerUser = async (req, res) => {
  let payload = null;
  try {
    payload = userSchema.parse(req.body);
  } catch (error) {
    sendValidationErrorResponse(res, error);
  }
  const hashedPassword = hashPassword(payload.password);
  payload.password = hashedPassword;

  const newUser = await userModel.create(payload);
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: newUser,
  });
};


export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        return await registerUser(req, res);
      default:
        throwRouteError(req.url, req.method);
    }
  } catch (error) {
    send404Response(res, error);
  }
};
