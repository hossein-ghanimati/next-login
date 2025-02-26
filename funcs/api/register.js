import { sendValidationErrorResponse } from "@/utils/api/responses";
import { userSchema } from "@/validation/user";
import userModel from "@/models/user";
export const validateRegister = (res, payload) => {
  try {
    return (payload = userSchema.parse(payload));
  } catch (error) {
    sendValidationErrorResponse(res, error);
  }
};

export const sendNewUserToken = (res, token) =>  {
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/;  Max-Age=604800`)
  res.status(201).json({
    success: true,
    message: "User registered successfully"
  });
}

export const checkIsFirstUser = async () => {
  const users = await userModel.find();
  return users.length === 0;
}