import { sendValidationErrorResponse } from "@/utils/api/responses";
import { userSchema } from "@/validation/user";

export const validateRegister = (res, payload) => {
  try {
    return (payload = userSchema.parse(payload));
  } catch (error) {
    sendValidationErrorResponse(res, error);
  }
};

export const sendNewUserToken = (res, token) =>  {
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Domain=localhost:3000; Max-Age=604800`)
  res.cookie("token", "seted token", { httpOnly: true, sameSite: 'none', secure: true }).status(201).json({
    success: true,
    message: "User registered successfully",
    data: token,
  });
}